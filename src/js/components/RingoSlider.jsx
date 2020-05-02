/* eslint-disable */

import React, { Component, useState} from "react";
import Draggable from 'react-draggable'; // The default
import '../../css/RingoButton.css';
import '../../css/RingoObject.css';

import { IOLetType } from './IOLet'
import IOLetStrip from './IOLetStrip'
import ProcessorTree from '../utils/ProcessorTree'

function RingoButton(props) {
    
    const handleChange = (e) => {
        ProcessorTree.objects[props.id].setValue(e.target.value)
    }

    return (<Draggable>
        <div className="RingoSlider">
            <IOLetStrip id={props.id}
                numIOLets={props.numInlets}
                connectionType={IOLetType.In} />
            <input onChange={handleChange}type='range'></input>
            <IOLetStrip id={props.id} numIOLets={props.numOutlets} connectionType={IOLetType.Out} />
        </div>
    </Draggable>
    )
}

export default RingoButton;