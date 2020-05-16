/* eslint-disable */

import React from 'react';
import '../../css/PatchCable.css'
function PatchCable(props) {

    const handleClick = () => {
        console.log('clicked on patch cable');
        
    }


    return (
        <svg className='PatchCable' className="PatchCable">
            <line className='PatchCableLine' onClick={handleClick} x1={props.pos1.x} y1={props.pos1.y} x2={props.pos2.x} y2={props.pos2.y}></line>
        </svg>
    );

}


export default PatchCable;
