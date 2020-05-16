/* eslint-disable */

import React, { useState } from "react";
import Draggable from 'react-draggable'; // The default
import '../../css/RingoButton.css';
import '../../css/RingoObject.css';

import { IOLetType } from './IOLet'
import IOLetStrip from './IOLetStrip'
import ProcessorTree from '../utils/ProcessorTree'

function RingoButton(props) {
    
    const [isDrag, setIsDrag] = useState(0);
    const [isDown, setIsDown] = useState(false)
    function handleClick(e) {
        ProcessorTree.resume()
        ProcessorTree.setSelected(props.id)

        // props.selectNewObject({ id: props.id });
        // props.sendObjectData({ value: 'BANG', outletIndex: 0, objectId: props.id })
        ProcessorTree.objects[props.id].sendData('BANG')
        e.stopPropagation();
        setIsDrag(false);

    }

    return (<Draggable disabled={props.isLocked} bounds='parent' enableUserSelectHack={false} defaultPosition={{ x: props.position.x, y: props.position.y }}>
        <div className="RingoButton">
        <IOLetStrip className='Inlets' updateShowInfo={props.updateShowInfo} id={props.id} numIOLets={props.numInlets} connectionType={IOLetType.In} />
            <svg className='Shape'>
                <circle 
                className="RingoButtonCircle" 
                onMouseDown={()=>setIsDown(true)} 
                onMouseUp={()=>setIsDown(false)} 
                cx="50%" cy="50%" r="20%" 
                fill={isDown ? "white" : "black"}
                onClick={handleClick} stroke="aqua"> 
                </circle>
            </svg>
            <IOLetStrip className='Outlets' updateShowInfo={props.updateShowInfo} id={props.id} numIOLets={props.numOutlets} connectionType={IOLetType.Out} />
        </div>
    </Draggable>
    )
}

export default RingoButton;