import React, { Component } from "react";
import { connect } from "react-redux";
import Draggable from 'react-draggable'; // The default
import '../../css/QuaxObject.css';
import IOLet from "./IOLet";
import { IOLetType } from './IOLet'
import { OBJECT_TYPES } from "../constants/object-types.js";
import { objectTypeChanged, sendObjectData, testThunk } from '../actions/actions'

function mapStateToProps(state) {
    return {
        test: "test"
    };
}

function mapDispatchToProps(dispatch) {
    return {
        objectTypeChanged: newType => dispatch(objectTypeChanged(newType)),
        sendObjectData: data => dispatch(sendObjectData(data)),
        testThunk: thunk => dispatch(testThunk())
    };
}

class ConnectedQuaxObject extends Component {
    constructor(props) {
        super(props);
        this.state = {
            textValue: '',
            inputDisabled: false
        }
    }

    handleChange(e) {
        this.setState({ textValue: event.target.value });
    }

    handleClick(e) {
        console.log("Clicked on object with id:", this.props.id);
        
        switch (this.props.type) {
            case OBJECT_TYPES.BUTTON:
                console.log("button clicked, bang sent");
                this.props.sendObjectData({value: 'BANG', outletIndex: 0, objectId: this.props.id})
                break;
            default: break
        }
        e.stopPropagation();
    }

    handleSubmit(e) {
        e.preventDefault();
        var newObjectType = this.state.textValue.toUpperCase();
        for (var type in OBJECT_TYPES) {
            if (OBJECT_TYPES[type] === newObjectType) {
                this.props.objectTypeChanged({ id: parseInt(this.props.id), newObjectType: newObjectType });
                switch (newObjectType) {
                    case OBJECT_TYPES.BUTTON:
                        this.setState({inputDisabled: true, textValue: ""})
                        break;
                    default: break
                }
                return;
            }
        }

        this.props.objectTypeChanged({ id: parseInt(this.props.id), newObjectType: OBJECT_TYPES.INVALID });

    }

    render() {


        var inlets = [];
        var outlets = [];


        for (let i = 0; i < this.props.numInlets; i++) {
            inlets.push(<IOLet key={this.props.id + ":" + IOLetType.In + "" + i} ioletIndex={i} parentId={this.props.id} connectionType={IOLetType.In}></IOLet>)
        }

        for (let i = 0; i < this.props.numOutlets; i++) {
            outlets.push(<IOLet key={this.props.id + ":" + IOLetType.Out + "" + i} ioletIndex={i} parentId={this.props.id} connectionType={IOLetType.Out}></IOLet>)
        }

        var className;
        if (this.props.type == OBJECT_TYPES.BUTTON)
            className = 'QuaxButton'
        else
            className = 'QuaxObject'

        return (
            <Draggable enableUserSelectHack={false} defaultPosition={{ x: this.props.position.x, y: this.props.position.y }}>
                <div className={className} onClick={this.handleClick.bind(this)}>
                    <div className="Inlets">
                        {inlets}
                    </div>
                    <form onSubmit={this.handleSubmit.bind(this)}>
                        <input disabled={this.state.inputDisabled} onKeyDown={e => e.stopPropagation()} name='type' value={this.state.textValue} type="text" onChange={this.handleChange.bind(this)}></input>
                    </form>
                    <div className="Outlets">
                        {outlets}
                    </div>
                </div>
            </Draggable>
        )
    }
}

const QuaxObject = connect(
    null,
    mapDispatchToProps)(ConnectedQuaxObject);
export default QuaxObject;
