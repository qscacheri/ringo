import React, { Component } from "react";
import { connect } from "react-redux";
import Draggable from 'react-draggable'; // The default
import '../../css/QuaxObject.css';
import IOLet from "./IOLet";
import { IOLetType } from './IOLet'
import { OBJECT_TYPES } from "../constants/object-types.js";
import { updateObject as updateObject, sendObjectData, selectNewObject } from '../actions/actions'

function mapStateToProps(state) {
    return {
        test: "test"
    };
}

function mapDispatchToProps(dispatch) {
    return {
        updateObject: newType => dispatch(updateObject(newType)),
        sendObjectData: data => dispatch(sendObjectData(data)),
        selectNewObject: newObject => dispatch(selectNewObject(newObject))
    };
}

class ConnectedQuaxObject extends Component {
    constructor(props) {
        super(props);
        this.ref = React.createRef();
        this.state = {
            isDrag: false, 
            textValue: '',
            inputDisabled: true
        }
    }

    handleChange(e) {
        this.setState({ textValue: event.target.value });
    }

    handleDrag(e, data)
    {
        this.setState({isDrag: true})
    }


    handleClick(e) {
        if (this.state.isDrag == false)
        {
            console.log("Clicked on object with id:", this.props.id);
            this.setState({inputDisabled: false});
            this.ref.current.focus();
        }
        
        this.props.selectNewObject({id: this.props.id});
        switch (this.props.type) {
            case OBJECT_TYPES.BUTTON:
                this.props.sendObjectData({value: 'BANG', outletIndex: 0, objectId: this.props.id})
                break;
            default: break
        }
        e.stopPropagation();
        this.setState({isDrag: false});
    }

    handleSubmit(e) 
    {
        e.preventDefault();
        var newObjectType = this.state.textValue.toUpperCase();
        this.props.updateObject({id: parseInt(this.props.id), objectText: this.state.textValue});
        return;
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
            <Draggable onDrag={this.handleDrag.bind(this)} enableUserSelectHack={false} defaultPosition={{ x: this.props.position.x, y: this.props.position.y }}>
                <div className={className} onClick={this.handleClick.bind(this)}>
                    <div className="Inlets">
                        {inlets}
                    </div>
                    <form onSubmit={this.handleSubmit.bind(this)}>
                        <input ref={this.ref} autoComplete="off" onBlur={ disableInput=>{ this.setState({inputDisabled: true})} }disabled={this.state.inputDisabled} onKeyDown={e => e.stopPropagation()} name='type' value={this.state.textValue} type="text" onChange={this.handleChange.bind(this)}></input>
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
