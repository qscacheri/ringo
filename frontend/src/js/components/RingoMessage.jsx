import React, { useState, useEffect, useContext } from "react";
import Draggable from 'react-draggable'; // The default
import '../../css/RingoMessage.css';
import { IOLetType } from './IOLet'
import IOLetStrip from './IOLetStrip'
import { Context } from './Processor'

function RingoMessage(props) {
    let ref = React.createRef();
    const [isDrag, setIsDrag] = useState(false);
    const [textValue, setTextValue] = useState("");
    const ProcessorContext = useContext(Context)
    const [position, setPosition] = useState({x: 0, y: 0})

    useEffect(() => {
        if (textValue !== props.text)
            setTextValue(props.text)
    }, [props.text])

    function handleChange(e) {
        setTextValue(event.target.value);
    }


    function handleDrag(e, data) {
        setIsDrag(true);
        setPosition({ x: data.x, y: data.y })
    }

    function handleClick(e) {
        e.stopPropagation();
        if (ProcessorContext.locked)
            ProcessorContext.triggerMessage(props.id)
        setIsDrag(false);
    }

    function handleSubmit(e) {
        e.preventDefault();
        ProcessorContext.updateMessage(props.id, textValue)
        return;
    }

    return (
        <Draggable bounds={{ top: 30 }} onDrag={handleDrag} enableUserSelectHack={false} defaultPosition={{ x: props.position.x, y: props.position.y }}>
            <div className="RingoMessage" onClick={handleClick}>
                <IOLetStrip className='Inlets' offsets={props.offsets} updateShowInfo={props.updateShowInfo} id={props.id} numIOLets={props.numInlets} connectionType={IOLetType.In} dragging={position} />
                <form onSubmit={handleSubmit}>
                    <input ref={ref} autoComplete="off" onKeyDown={e => e.stopPropagation()} name='type' value={textValue} type="text" onChange={handleChange}></input>
                </form>
                <IOLetStrip className='Outlets' offsets={props.offsets} updateShowInfo={props.updateShowInfo} id={props.id} numIOLets={props.numOutlets} connectionType={IOLetType.Out} dragging={isDrag} />
            </div>
        </Draggable>
    )
}

export default RingoMessage;
