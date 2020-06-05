import React, { useState, useEffect, useRef, useContext } from "react";
import Draggable from 'react-draggable'; // The default
import '../../css/RingoObject.css';
import { IOLetType } from './IOLet'
import IOLetStrip from './IOLetStrip'
import ProcessorTree from '../utils/ProcessorTree'
import {Context} from './Processor'

function RingoObject(props) {
    const [isDrag, setIsDrag] = useState(false);
    const [textValue, setTextValue] = useState("");
    const [inputDisabled, setInputDisabled] = useState(true);
    let ref = useRef(null)
    const ProcessorContext = useContext(Context)
    const [position, setPosition] = useState({x: 0, y: 0})

    useEffect(() => {
        setTextValue(ProcessorContext.objects[props.id].text)        
    }, [])

    useEffect(() => {
                    
    })

    function handleChange(e) {
        setTextValue(event.target.value);
    }


    function handleDrag(e, data) {
        setIsDrag(true);
        setPosition({ x:data.x, y: data.y })
    }

    const handleStop = (e, data) => {
        ProcessorContext.updatePosition(props.id, { x:data.x, y: data.y })
        setPosition({ x:data.x, y: data.y })
    }

    function handleClick(e) {
        ProcessorContext.setSelectedObject(props.id)
        if (isDrag === false) {
            console.log("Clicked on object with id:", props.id);
            // this.setState({ inputDisabled: false });
            setInputDisabled(false);
            // this.ref.current.focus();
            ref.current.focus();
        }

        e.stopPropagation();
        setIsDrag(false);
    }
    
    function handleSubmit(e)
    {
        e.preventDefault();
        
        ProcessorContext.updateObject(props.id, textValue)
        return;
    }

    return (
        <Draggable bounds='parent' disabled={props.isLocked} onStop={handleStop} onDrag={handleDrag} enableUserSelectHack={false} defaultPosition={{ x: props.position.x, y: props.position.y }}>
            <div className="RingoObject" onClick={handleClick}>
                <IOLetStrip className='Inlets' offsets={props.offsets} updateShowInfo={props.updateShowInfo} id={props.id} numIOLets={props.numInlets} connectionType={IOLetType.In} dragging={position} />
                <form onSubmit={handleSubmit}>
                    <input ref={ref} autoComplete="off" onBlur={() => { setInputDisabled(true) }} disabled={inputDisabled} onKeyDown={e => e.stopPropagation()} name='type' value={textValue} type="text" onChange={handleChange}></input>
                </form>
                <IOLetStrip className='Outlets' offsets={props.offsets} updateShowInfo={props.updateShowInfo} id={props.id} numIOLets={props.numOutlets} connectionType={IOLetType.Out} dragging={position}/>
            </div>
        </Draggable>
    )
}

export default RingoObject;
