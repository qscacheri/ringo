/* eslint-disable */

import React, { Component } from "react";
import { connect } from "react-redux";
import Draggable from 'react-draggable'; // The default
import '../../css/QuaxObject.css';
import IOLet from "./IOLet";
import { IOLetType } from './IOLet'
import { OBJECT_TYPES } from "../constants/object-types.js";
import { updateObject, sendObjectData, selectNewObject } from '../actions/actions'
var p5 = require('p5')
import { Oscillator } from "tone";
import IOLetStrip from './IOLetStrip'

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

    handleDrag(e, data) {
        this.setState({ isDrag: true })
    }


    handleClick(e) {
        if (this.state.isDrag == false) {
            console.log("Clicked on object with id:", this.props.id);
            this.setState({ inputDisabled: false });
            this.ref.current.focus();
        }

        this.props.selectNewObject({ id: this.props.id });
        switch (this.props.type) {
            case OBJECT_TYPES.BUTTON:
                this.props.sendObjectData({ value: 'BANG', outletIndex: 0, objectId: this.props.id })
                break;
            default: break
        }
        e.stopPropagation();
        this.setState({ isDrag: false });
    }

    handleSubmit(e) {
        e.preventDefault();
        var newObjectType = this.state.textValue.toUpperCase();
        this.props.updateObject({ id: parseInt(this.props.id), objectText: this.state.textValue });
        return;
    }

    render() {


        var className = 'QuaxObject'

        return (
            <Draggable bounds={{ top: 30 }} onDrag={this.handleDrag.bind(this)} enableUserSelectHack={false} defaultPosition={{ x: this.props.position.x, y: this.props.position.y }}>
                <div className={className} onClick={this.handleClick.bind(this)}>
                    <IOLetStrip className='Inlets' id={this.props.id} numIOLets={this.props.numInlets} connectionType={IOLetType.In}/>
                    <form onSubmit={this.handleSubmit.bind(this)}>
                        <input ref={this.ref} autoComplete="off" onBlur={disableInput => { this.setState({ inputDisabled: true }) }} disabled={this.state.inputDisabled} onKeyDown={e => e.stopPropagation()} name='type' value={this.state.textValue} type="text" onChange={this.handleChange.bind(this)}></input>
                    </form>
                    <IOLetStrip className='Outlets' id={this.props.id} numIOLets={this.props.numOutlets} connectionType={IOLetType.Out}/>
                </div>
            </Draggable>    
        )
    }
}

const QuaxObject = connect(
    null,
    mapDispatchToProps)(ConnectedQuaxObject);
export default QuaxObject;
