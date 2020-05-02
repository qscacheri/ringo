import React, { useState, useEffect } from "react";
import Draggable from 'react-draggable'; // The default
import '../../css/RingoMessage.css';
import { IOLetType } from './IOLet.js'
import IOLetStrip from './IOLetStrip.js'
import ProcessorTree from '../utils/ProcessorTree'

function RingoMessage(props) {
    let ref = React.createRef();
    const [isDrag, setIsDrag] = useState(false);
    const [textValue, setTextValue] = useState("");
    const [inputDisabled, setInputDisabled] = useState(true);

    useEffect(() => {
        ProcessorTree.registerMessageCallback(props.id, (newValue) => {
            console.log('message value changed');
            setTextValue(newValue)
        })
    }, [])

    function handleChange(e) {
        setTextValue(event.target.value);
    }


    function handleDrag(e, data) {
        setIsDrag(true);
    }


    function handleClick(e) {        
        ProcessorTree.triggerMessage(props.id)
        e.stopPropagation();
        setIsDrag(false);
    }
    
    function handleSubmit(e)
    {
        e.preventDefault();        
        ProcessorTree.updateMessage(props.id, textValue)
        return;
    }

    return (
        <Draggable bounds={{ top: 30 }} onDrag={handleDrag} enableUserSelectHack={false} defaultPosition={{ x: props.position.x, y: props.position.y }}>
            <div className="RingoMessage" onClick={handleClick}>
                <IOLetStrip className='Inlets' id={props.id} numIOLets={props.numInlets} connectionType={IOLetType.In} />
                <form onSubmit={handleSubmit}>
                    <input ref={ref} autoComplete="off" onBlur={() => { setInputDisabled(true) }} onKeyDown={e => e.stopPropagation()} name='type' value={textValue} type="text" onChange={handleChange}></input>
                </form>
                <IOLetStrip className='Outlets' id={props.id} numIOLets={props.numOutlets} connectionType={IOLetType.Out} />
            </div>
        </Draggable>
    )
}

export default RingoMessage;
