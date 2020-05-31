import React, { useState, useEffect, useRef, useContext } from "react";
import Draggable from 'react-draggable'; // The default
import '../../css/RingoThree.css';
import { IOLetType } from './IOLet'
import IOLetStrip from './IOLetStrip'
import { Context } from './Processor'

function RingoThree(props) {
    const [isDrag, setIsDrag] = useState(false);
    let myRef = useRef(null)
    const ProcessorContext = useContext(Context)
    const [position, setPosition] = useState({x: 0, y: 0})

    useEffect(() => {
        const width = myRef.current.getBoundingClientRect().width
        const height = myRef.current.getBoundingClientRect().height
        ProcessorContext.initializeThree(props.id, width, height, (renderer) => {
            console.log("three has been initialized");
            myRef.current.appendChild(renderer.domElement);
        })
    }, [])

    function handleDrag(_, data) {
        setIsDrag(true);
        setPosition({ x:data.x, y: data.y })
    }

    return (
        <Draggable disabled={props.isLocked} bounds='parent' onDrag={handleDrag} enableUserSelectHack={false} defaultPosition={{ x: props.position.x, y: props.position.y }}>
            <div className="RingoThree">
                <IOLetStrip className='Inlets' offsets={props.offsets} updateShowInfo={props.updateShowInfo} id={props.id} numIOLets={props.numInlets} connectionType={IOLetType.In} dragging={position} />
                <div className='ThreeCanvas' ref={myRef}></div>
                <IOLetStrip className='Outlets' offsets={props.offsets} updateShowInfo={props.updateShowInfo} id={props.id} numIOLets={props.numOutlets} connectionType={IOLetType.Out} dragging={isDrag} />
            </div>
        </Draggable>
    )


}

export default RingoThree;
