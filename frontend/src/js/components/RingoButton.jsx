/* eslint-disable */

import React, { useState, useContext } from "react";
import Draggable from 'react-draggable'; // The default
import '../../css/RingoButton.css';
import '../../css/RingoObject.css';

import { IOLetType } from './IOLet'
import IOLetStrip from './IOLetStrip'
import { Context } from './Processor'

function RingoButton(props) {

    const [isDrag, setIsDrag] = useState(0);
    const [isDown, setIsDown] = useState(false)
    const ProcessorContext = useContext(Context)
    const [position, setPosition] = useState({x: 0, y: 0})

    function handleClick(e) {
        ProcessorContext.objects[props.id].sendData('BANG')
        e.stopPropagation();
        setIsDrag(false);

    }

    function handleDrag(e, data) {
        setIsDrag(true);
        setPosition({ x: data.x, y: data.y })
    }


    return (
        <Draggable bounds={{ top: 30 }} onDrag={handleDrag} enableUserSelectHack={false} defaultPosition={{ x: props.position.x, y: props.position.y }}>
            <div className="RingoButton">
                <IOLetStrip className='Inlets' offsets={props.offsets} updateShowInfo={props.updateShowInfo} id={props.id} numIOLets={props.numInlets} connectionType={IOLetType.In} dragging={position} />
                <svg className='Shape'>
                    <circle
                        className="RingoButtonCircle"
                        onMouseDown={() => setIsDown(true)}
                        onMouseUp={() => setIsDown(false)}
                        cx="50%" cy="50%" r="20%"
                        fill={isDown ? "white" : "black"}
                        onClick={handleClick} stroke="aqua">
                    </circle>
                </svg>
                <IOLetStrip className='Outlets' offsets={props.offsets} updateShowInfo={props.updateShowInfo} id={props.id} numIOLets={props.numOutlets} connectionType={IOLetType.Out} dragging={isDrag} />
            </div>
        </Draggable>
    )
}

export default RingoButton;