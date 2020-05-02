/* eslint-disable */

import React, { Component, useState} from "react";
import Draggable from 'react-draggable'; // The default
import '../../css/RingoButton.css';
import '../../css/RingoObject.css';

import { IOLetType } from './IOLet'
import IOLetStrip from './IOLetStrip'
import ProcessorTree from '../utils/ProcessorTree'

function RingoButton(props) {
    
    const [isDrag, setIsDrag] = useState(0);
    function handleClick(e) {

        // props.selectNewObject({ id: props.id });
        // props.sendObjectData({ value: 'BANG', outletIndex: 0, objectId: props.id })
        ProcessorTree.objects[props.id].sendData()
        e.stopPropagation();
        setIsDrag(false);

    }

    return (<Draggable>
        <div className="RingoButton">
            <IOLetStrip id={props.id}
                numIOLets={props.numInlets}
                connectionType={IOLetType.In} />
            <svg>
                <circle className="RingoButtonCircle" cx="50%" cy="50%" r="20%" onClick={handleClick} stroke="aqua"> </circle>
            </svg>
            <IOLetStrip id={props.id} numIOLets={props.numOutlets} connectionType={IOLetType.Out} />
        </div>
    </Draggable>
    )
}

export default RingoButton;