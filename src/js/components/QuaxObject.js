import React, { Component } from "react";
import { connect } from "react-redux";
import Draggable from 'react-draggable'; // The default
import '../../css/QuaxObject.css';
import IOLet from "./IOLet";
import { IOLetType } from './IOLet'
import { OBJECT_TYPES } from "../constants/object-types";
import {objectTypeChanged} from '../actions/index'

function mapStateToProps(state) {
    return {
        test: "test"
    };
}

function mapDispatchToProps(dispatch) {
    return {
        objectTypeChanged: newType => dispatch(objectTypeChanged(newType))
    };
}

class ConnectedQuaxObject extends Component {
    constructor(props) {
        super(props);
        this.state = {
            textValue: ''
        }     
    }

    handleChange(e)
    {
        this.setState({ textValue: event.target.value });
    }

    handleClick(e)
    {
        e.stopPropagation();
    }

    handleSubmit(e)
    {        
        e.preventDefault();
        var newObjectType = this.state.textValue.toUpperCase();
        for (var type in OBJECT_TYPES)
        {
            if (OBJECT_TYPES[type]===newObjectType)
            {
                this.props.objectTypeChanged({id: this.props.id, newObjectType: newObjectType});
                return;
            }
        }

        this.props.objectTypeChanged({id: this.props.id, newObjectType: OBJECT_TYPES.INVALID});
        
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
        
        return (
            <Draggable enableUserSelectHack={false} defaultPosition={{x: this.props.position.x, y: this.props.position.y}}>
                <div className="QuaxObject" onClick={this.handleClick.bind(this)}>
                    <div className="Inlets">
                        {inlets}
                    </div>
                    <form onSubmit={this.handleSubmit.bind(this)}>
                        <input onKeyDown={e => e.stopPropagation()} name='type' value={this.state.textValue} type="text" onChange={this.handleChange.bind(this)}></input>
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
    mapDispatchToProps) (ConnectedQuaxObject);
export default QuaxObject;
