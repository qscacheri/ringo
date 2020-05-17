import React, { useState, useEffect, useRef } from "react";
import Draggable from 'react-draggable'; // The default
import '../../css/RingoObject.css';
import { IOLetType } from './IOLet'
import IOLetStrip from './IOLetStrip'
import ProcessorTree from '../utils/ProcessorTree'
import PatchCableManager from "../utils/PatchCableManager";

function RingoObject(props) {
    const [isDrag, setIsDrag] = useState(false);
    const [textValue, setTextValue] = useState("");
    const [inputDisabled, setInputDisabled] = useState(true);
    let ref = useRef(null)
    let outletRefs = []

    useEffect(() => {
        setTextValue(ProcessorTree.objects[props.id].text)
    }, [])

    function handleChange(e) {
        setTextValue(event.target.value);
    }


    function handleDrag(e, data) {
        setIsDrag(true);
    }

    function handleClick(e) {
        ProcessorTree.resume()
        ProcessorTree.setSelected(props.id)
        console.log(props.isLocked);
        
        if (isDrag == false) {
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
        console.log(textValue);
        
        ProcessorTree.updateObject(props.id, textValue)
        return;
    }

    const handleRef = (ref) => {
        // console.log(ref);
        
    }

    const handleStop = (e, data) => {
        ProcessorTree.objects[props.id].position = { x:data.x, y: data.y }
    }

    return (
        <Draggable bounds='parent' disabled={props.isLocked} onStop={handleStop} onDrag={handleDrag} enableUserSelectHack={false} defaultPosition={{ x: props.position.x, y: props.position.y }}>
            <div className="RingoObject" onClick={handleClick}>
                <IOLetStrip className='Inlets' handleRef={handleRef} updateShowInfo={props.updateShowInfo} id={props.id} numIOLets={props.numInlets} connectionType={IOLetType.In} />
                <form onSubmit={handleSubmit}>
                    <input ref={ref} autoComplete="off" onBlur={() => { setInputDisabled(true) }} disabled={inputDisabled} onKeyDown={e => e.stopPropagation()} name='type' value={textValue} type="text" onChange={handleChange}></input>
                </form>
                <IOLetStrip className='Outlets' updateShowInfo={props.updateShowInfo} id={props.id} numIOLets={props.numOutlets} connectionType={IOLetType.Out} />
            </div>
        </Draggable>
    )


}

export default RingoObject;
