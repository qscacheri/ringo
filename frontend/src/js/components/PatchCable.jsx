/* eslint-disable */

import React from 'react';
import '../../css/PatchCable.css'

function PatchCable(props) {    
    const handleClick = () => {
        
    }

    return (
        <svg className="PatchCable">
            <line onClick={handleClick} x1={props.pos1.x} y1={props.pos1.y} x2={props.pos2.x} y2={props.pos2.y} style={{ display: "inline", strokeWidth, stroke: "aqua" }}></line>
        </svg>
    );
}

export default PatchCable