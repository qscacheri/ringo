/* eslint-disable */

import React, { useState, useEffect, useRef } from "react";
import OBJECT_TYPES from '../constants/object-types';
import RingoObject from './RingoObject'
import '../../css/App.css';
import PatchCable from "./PatchCable";
import Toolbar from './Toolbar'
import RingoButton from './RingoButton'
import ProcessorTree from '../utils/ProcessorTree'
import PatchCableManager from '../utils/PatchCableManager'
import RingoMessage from "./RingoMessage";
import RingoThree from './RingoThree'

function App() {
    // let mousePosition = useRef({ x: 0, y: 0 })
    const [mousePosition, setMousePostion] = useState()
    const [objectIDs, setObjectIDs] = useState([])
    let myRef = useRef(null)

    useEffect(() => {
        ProcessorTree.newObjectCallback = (newObjectID) => {
            
            setObjectIDs([...objectIDs, newObjectID])
        }
        window.tree = ProcessorTree
        console.log(window.mm);

    }, [])

    function handleKeyDown(e) {
        console.log(e);
        
        // CREATE NEW OBJECT
        if (e.key == 'n' || e.key == 'N') {
            ProcessorTree.addObject();
            return;
        }

        else if (e.key == 'm' || e.key == 'M') {
            ProcessorTree.addObject(OBJECT_TYPES.MESSAGE);
            return;
        }

        // DELETE OBJECT
        if (e.keyCode == 8) {
            const deletedObjectID = ProcessorTree.deleteSelected()
            PatchCableManager.objectDeleted(deletedObjectID)
        }
    }

    function handleMouseMove(e) {
        setMousePostion({
            x: e.pageX,
            y: e.pageY
        })
    }

    function handleClick(e) {
        PatchCableManager.handleClick(null)
    }

    const renderRingoObjects = () => {
        const objects = []
        for (let i in ProcessorTree.objects) {
            switch (ProcessorTree.objects[i].type) {
                case OBJECT_TYPES.BUTTON:
                    objects.push(<RingoButton
                        key={i}
                        id={i}
                        position={{ x: 100, y: 100 }}
                        numInlets={ProcessorTree.objects[i].numInlets}
                        numOutlets={ProcessorTree.objects[i].numOutlets}
                    />)
                    break;
                case OBJECT_TYPES.MESSAGE:
                    objects.push(<RingoMessage
                        key={i}
                        id={i}
                        position={{ x: 100, y: 100 }}
                        numInlets={ProcessorTree.objects[i].numInlets}
                        numOutlets={ProcessorTree.objects[i].numOutlets}
                    />)
                    break;
                case OBJECT_TYPES.THREE_CANVAS:
                    objects.push(<RingoThree
                        key={i}
                        id={i}
                        position={{ x: 100, y: 100 }}
                        numInlets={ProcessorTree.objects[i].numInlets}
                        numOutlets={ProcessorTree.objects[i].numOutlets}
                    />)
                    break;

                default:
                    objects.push(<RingoObject
                        key={i}
                        id={i}
                        position={{ x: 100, y: 100 }}
                        numInlets={ProcessorTree.objects[i].numInlets}
                        numOutlets={ProcessorTree.objects[i].numOutlets}
                    />)
                    break;
            }
        }
        return objects
    }

    const renderPatchCables = () => {
        console.log(window.pageYOffset)

        const patchCables = []
        for (let i in PatchCableManager.patchCables) {
            if (i == PatchCableManager.activeCableID)
                patchCables.push(<PatchCable
                    key={i}
                    pos1={PatchCableManager.patchCables[i].getPosition('OUT')}
                    pos2={mousePosition}
                />)
            else
                patchCables.push(<PatchCable
                    key={i}
                    pos1={PatchCableManager.patchCables[i].getPosition('OUT')}
                    pos2={PatchCableManager.patchCables[i].getPosition('IN')}
                />)
        // console.log(PatchCableManager.patchCables[i].getPosition('OUT'))
        }
        return patchCables
    }

    return (
        <div className="App" ref={myRef} tabIndex="0" onClick={handleClick} onMouseMove={handleMouseMove} onKeyDown={handleKeyDown}>
            <div className='WorkSpace'>
                {renderPatchCables()}
                {renderRingoObjects()}
            </div>
            <Toolbar />
        </div>)
}

export default App;
