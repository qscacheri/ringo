import React, { useState, useEffect, useRef, useContext } from "react";
import OBJECT_TYPES from '../constants/object-types';
import RingoObject from './RingoObject'
import '../../css/Workspace.css';
import PatchCable from "./PatchCable";
import RingoButton from './RingoButton'
import ProcessorTree from '../utils/ProcessorTree'
import PatchCableManager from '../utils/PatchCableManager'
import RingoMessage from "./RingoMessage";
import RingoThree from './RingoThree'
import RingoSlider from './RingoSlider'
import Processor, { Context } from './Processor'
import IOLetDescriptionPopup from './IOletDescriptionPopup'
function Workspace({ processor }) {
    const ProcessorContext = useContext(Context)
    const [mousePosition, setMousePostion] = useState()
    const [objectIDs, setObjectIDs] = useState([])
    const [locked, setLocked] = useState(false)
    const [infoPopup, setInfsoPopup] = useState({
        visible: false,
        position: { x: 0, y: 0 },
        text: ""
    })

    const createObject = (type) => {
        Processor.addObject(type, 200, 200);
    }

    const handleLock = () => {
        ProcessorTree.toggleLock()
    }

    const renderRingoObjects = () => {
        const objects = []
        for (let i in ProcessorContext.objects) {
            let sharedProps = {
                key: i,
                id: i,
                processor,
                position: { x: ProcessorContext.objects[i].position.x, y: ProcessorContext.objects[i].position.y },
                numInlets: ProcessorContext.objects[i].numInlets,
                numOutlets: ProcessorContext.objects[i].numOutlets,
                updateShowInfo: updateShowInfo,
                isLocked: locked

            }
            switch (ProcessorContext.objects[i].type) {
                case OBJECT_TYPES.BUTTON:
                    objects.push(<RingoButton {...sharedProps} />)
                    break;
                case OBJECT_TYPES.MESSAGE:
                    objects.push(<RingoMessage {...sharedProps} />)
                    break;
                case OBJECT_TYPES.THREE_CANVAS:
                    objects.push(<RingoThree {...sharedProps} />)
                    break;
                case OBJECT_TYPES.SLIDER:
                    objects.push(<RingoSlider {...sharedProps} />)
                    break;
                default:
                    objects.push(<RingoObject {...sharedProps} />)
                    break;
            }
        }
        return objects
    }

    const renderPatchCables = () => {
        const patchCables = []
        for (let i in PatchCableManager.patchCables) {
            if (i == PatchCableManager.activeCableID)
                patchCables.push(<PatchCable
                    key={i}
                    pos1={PatchCableManager.patchCables[i].getActivePosition()}
                    pos2={mousePosition}
                />)
            else
                patchCables.push(<PatchCable
                    key={i}
                    pos1={PatchCableManager.patchCables[i].getPosition('OUT')}
                    pos2={PatchCableManager.patchCables[i].getPosition('IN')}
                />)
        }
        return patchCables
    }

    function updateShowInfo(visible, position, id, ioletType, index) {
        const object = ProcessorContext.objects[id]
        const type = (object.type).toLowerCase()
        const description = object.getIOLetDescription(ioletType, index)
        // setInfoPopup({ visible, position, text: type + ": " + description })
    }

    function handleMouseMove(e) {
        setMousePostion({
            x: e.pageX,
            y: e.pageY
        })
    }

    function lock() {
        setLocked(!locked)
    }

    function handleClick() {
        PatchCableManager.handleClick(null)
        ProcessorTree.setSelected(-1)
    }

    function handleKeyDown(e) {
        // CREATE NEW OBJECT
        if (e.key == 'n' || e.key == 'N') {
            ProcessorTree.addObject(OBJECT_TYPES.EMPTY, mousePosition.x, mousePosition.y);
            ProcessorContext.addObject(OBJECT_TYPES.EMPTY, mousePosition.x, mousePosition.y); Object
            return;
        }

        else if (e.key == 'm' || e.key == 'M') {
            ProcessorTree.addObject(OBJECT_TYPES.MESSAGE, mousePosition.x, mousePosition.y);
            return;
        }

        else if (e.key == 's' || e.key == 'S') {
            ProcessorTree.addObject(OBJECT_TYPES.SLIDER, mousePosition.x, mousePosition.y);
            return;
        }

        else if (e.key == 'l' || e.key == 'L') {
            ProcessorTree.toggleLock()
            return;
        }

        else if (e.key == 'p' || e.key == 'P') {
            const state = ProcessorTree.save()
            localStorage.setItem('session', JSON.stringify(state));
            return;
        }


        // DELETE OBJECT
        if (e.keyCode == 8) {
            ProcessorTree.deleteSelected()
        }
    }

    return (
        <div className='WorkSpace'>
            <div className="Controls">
                <div>
                    <button className="ToolbarButton NewObject" onClick={() => { createObject(OBJECT_TYPES.EMPTY) }}>New Object</button> 
                    <button className="ToolbarButton NewMessage" onClick={() => { createObject(OBJECT_TYPES.MESSAGE) }}>New Message</button> 
                </div>
                <div>   
                    <button className="ToolbarButton" onClick={handleLock}>{locked ? "Unlock" : "Lock"}</button>
                </div>
            </div>

            {renderPatchCables()}
            {renderRingoObjects()}
            {infoPopup.visible ? <IOLetDescriptionPopup
                position={infoPopup.position}
                text={infoPopup.text} /> : null
            }
        </div>
    )
}

export default Workspace
