import React, { useRef, useState, useEffect, useContext } from "react";
import '../../css/IOLet.css';
import { PatchCableContext }  from './PatchCableManager'

export const IOLetType =
{
    In: 'IN',
    Out: 'OUT'
}

function IOLet(props) {
    let myRef = useRef(null)
    let callback = useRef(null)
    const [showInfo, setShowInfo] = useState(false)
    const PatchCableManger = useContext(PatchCableContext)
    const [position, setPosition] = useState({x: 0, y: 0})
    const getPosition = () => {
        const boundingRect = myRef.current.getBoundingClientRect();    
        return {
            x: window.scrollX + (boundingRect.x + (boundingRect.width / 2)) - props.offsets.x,
            y: window.scrollY + (boundingRect.y + (boundingRect.height / 2)) - props.offsets.y
        }
        
    }

    function handleClick() {        
        var boundingRect = myRef.current.getBoundingClientRect();                
        const ioletInfo = {
            objectID: props.parentId,
            ioletIndex: props.ioletIndex,
            connectionType: props.connectionType,
            position: getPosition(),
        }

        PatchCableManger.handleClick(ioletInfo) 
    }

    const getID = () => {
        return props.parentId + ':' + props.ioletIndex + ':' + props.connectionType
    }

    useEffect(() => {
        setPosition(getPosition())
        PatchCableManger.updatePosition(getID(), getPosition())
    }, [props.dragging])

    const handleMouseEnter = (e) => {
        callback.current = setTimeout(() => {
            setShowInfo(true)
            const boundingRect = myRef.current.getBoundingClientRect()
            const offset = props.connectionType === 'IN' ? -25 : 20
            props.updateShowInfo(true, {x: boundingRect.x, y:boundingRect.y + offset}, props.parentId, props.connectionType, props.ioletIndex)
        }, 600);
        
    }

    const handleMouseExit = (e) => {        
        clearTimeout(callback.current) 
        setShowInfo(false)
        props.updateShowInfo(false, {x: 0, y:0}, props.parentId, props.connectionType, props.ioletIndex)
    }


    return (
            <svg className="IOLet" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseExit} viewBox="0 0 100 100" preserveAspectRatio="xMinYMin meet" >
                <circle ref={myRef} onClick={handleClick} cx="50" cy="50" r="40" stroke="white" strokeWidth="10"/>
            </svg>
    );

}


export default IOLet;