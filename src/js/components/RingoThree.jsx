import React, { useState, useEffect, useRef } from "react";
import Draggable from 'react-draggable'; // The default
import '../../css/RingoThree.css';
import { IOLetType } from './IOLet'
import IOLetStrip from './IOLetStrip'
import ProcessorTree from '../utils/ProcessorTree'

function RingoThree(props) {
    let ref = React.createRef();
    const [isDrag, setIsDrag] = useState(false);
    const [textValue, setTextValue] = useState("");
    const [inputDisabled, setInputDisabled] = useState(true);
    let myRef = useRef(null)
    useEffect(() => {
        const width = myRef.current.getBoundingClientRect().width
        const height = myRef.current.getBoundingClientRect().height
        ProcessorTree.initializeThree(props.id, width, height, (renderer) => {
            console.log("three has been initialized");
            myRef.current.appendChild(renderer.domElement);
        })


    }, [])

    function handleChange(e) {
        setTextValue(event.target.value);
    }


    function handleDrag(e, data) {
        setIsDrag(true);
    }


    function handleClick(e) {
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

    return (
        <Draggable bounds='parent' onDrag={handleDrag} enableUserSelectHack={false} defaultPosition={{ x: props.position.x, y: props.position.y }}>
            <div className="RingoThree" onClick={handleClick}>
                <IOLetStrip className='Inlets' updateShowInfo={props.updateShowInfo} id={props.id} numIOLets={props.numInlets} connectionType={IOLetType.In} />
                <div className='ThreeCanvas' ref={myRef}></div>
                <IOLetStrip className='Outlets' updateShowInfo={props.updateShowInfo} id={props.id} numIOLets={props.numOutlets} connectionType={IOLetType.Out} />
            </div>
        </Draggable>
    )


}

export default RingoThree;
