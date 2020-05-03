import React, { useRef } from "react";
import '../../css/IOLet.css';
import PatchCableManger from '../../js/utils/PatchCableManager'

export const IOLetType =
{
    In: 'IN',
    Out: 'OUT'
}

function IOLet(props) {
    let myRef = useRef(null)

    function handleClick(event) {
        var boundingRect = myRef.current.getBoundingClientRect();

        const ioletInfo = {
            objectID: parseInt(props.parentId),
            ioletIndex: props.ioletIndex,
            connectionType: props.connectionType,
            position: {
                x: boundingRect.x + (boundingRect.width / 2),
                y: boundingRect.y + (boundingRect.height / 2)
            },
            ref: myRef.current
        }

        PatchCableManger.handleClick(ioletInfo)

    }

    return (
        <svg className="IOLet" viewBox="0 0 100 100" preserveAspectRatio="xMinYMin meet" >
            <circle ref={myRef} onClick={handleClick} cx="50" cy="50" r="40" stroke="white" strokeWidth="10"/>
        </svg>
    );

}


export default IOLet;