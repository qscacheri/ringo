/* eslint-disable */

import React from 'react';
import '../../css/PatchCable.css'
import PatchCableManager from '../utils/PatchCableManager';


function PatchCable(props) {    
    const handleClick = () => {
        console.log(props.id);
        PatchCableManager.selectedCable = props.id
    }

    var strokeWidth = 2;
    var left = 0;
    var top = 0;
    var width = '1000px';
    var height = '1000px';

    return (
        <svg style={{ position: "absolute", width, height, left, top}} className="PatchCable">
            <line onClick={handleClick} x1={props.pos1.x} y1={props.pos1.y} x2={props.pos2.x} y2={props.pos2.y} style={{ display: "inline", strokeWidth, stroke: "aqua" }}></line>
        </svg>
    );


}


export default PatchCable;
