import React, { useState } from "react";
import Draggable from 'react-draggable'; // The default
import '../../css/RingoSlider.css';
import { IOLetType } from './IOLet'
import IOLetStrip from './IOLetStrip'
import ProcessorTree from '../utils/ProcessorTree'

function RingoSlider(props) {
    const [position, setPosition] = useState({x: 0, y: 0})

    function handleDrag(e, data) {
        setPosition({ x:data.x, y: data.y })
    }

    function handleClick(e) {
        ProcessorTree.resume()
        ProcessorTree.setSelected(props.id)
        e.stopPropagation();
    }


    const handleChange = (e) => {
        ProcessorTree.objects[props.id].updateSliderValue(e.target.value)
    }
    
    return (
        <Draggable disabled={props.isLocked} bounds='parent' onDrag={handleDrag} enableUserSelectHack={false} defaultPosition={{ x: props.position.x, y: props.position.y }}>
            <div className="RingoSlider" onClick={handleClick}>
                <IOLetStrip className='Inlets' offsets={props.offsets} updateShowInfo={props.updateShowInfo} id={props.id} numIOLets={props.numInlets} connectionType={IOLetType.In} dragging={position} />
                <div className="SliderContainer">
                    <input className="Slider" type='range' min="0" max="1" step=".01" onChange={handleChange}></input>
                </div>
                <IOLetStrip className='Outlets' offsets={props.offsets} updateShowInfo={props.updateShowInfo} id={props.id} numIOLets={props.numOutlets} connectionType={IOLetType.Out} />
            </div>
        </Draggable>
    )


}

export default RingoSlider;
