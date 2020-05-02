
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

function QuaxDSPObject(props) {
    switch (props.type) {
        case OBJECT_TYPES.SINE:
            let dspObject = new Oscillator(440, 'sine').start().toMaster();
            break;
    }
    
    handleChange = e => {
        this.setState({ textValue: event.target.value });
    }

    handleDrag = (e, data) => {
        this.setState({ isDrag: true })
    }

    return (
        <Draggable bounds={{ top: 30 }} onDrag={handleDrag} enableUserSelectHack={false} defaultPosition={{ x: props.position.x, y: props.position.y }}>
            <div className={className} onClick={handleClick}>
                <IOLetStrip className='Inlets' id={props.id} numIOLets={props.numInlets} connectionType={IOLetType.In} />
                <form onSubmit={handleSubmit}>
                    <input ref={ref} autoComplete="off" onBlur={disableInput => { setState({ inputDisabled: true }) }} disabled={state.inputDisabled} onKeyDown={e => e.stopPropagation()} name='type' value={state.textValue} type="text" onChange={handleChange}></input>
                </form>
                <IOLetStrip className='Outlets' id={props.id} numIOLets={props.numOutlets} connectionType={IOLetType.Out} />
            </div>
        </Draggable>
    );
}

export default QuaxDSPObject;