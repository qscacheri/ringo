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
import RingoSlider from './RingoSlider'

import IOLetDescriptionPopup from './IOletDescriptionPopup'
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom";
import About from "./About";

function App() {
    // let mousePosition = useRef({ x: 0, y: 0 })
    const [mousePosition, setMousePostion] = useState()
    const [objectIDs, setObjectIDs] = useState([])
    const [locked, setLocked] = useState(false)
    const [infoPopup, setInfoPopup] = useState({
        visible: false,
        position: {x: 0, y: 0},
        text: ""
    })

    let myRef = useRef(null)

    useEffect(() => {
        ProcessorTree.newObjectCallback = (newObjectID) => {

            setObjectIDs([...objectIDs, newObjectID])
        }
        window.tree = ProcessorTree
        ProcessorTree.updateLock = (isLocked) => {
            console.log("lock status: ", isLocked);
            
            setLocked(isLocked)
        }

    }, [])

    function handleKeyDown(e) {
        // CREATE NEW OBJECT
        if (e.key == 'n' || e.key == 'N') {
            ProcessorTree.addObject(OBJECT_TYPES.EMPTY, mousePosition.x, mousePosition.y);
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

        // DELETE OBJECT
        if (e.keyCode == 8) {
            ProcessorTree.deleteSelected()
        }
    }

    function handleMouseMove(e) {
        setMousePostion({
            x: e.pageX,
            y: e.pageY
        })
    }

    function lock() {
        setLocked(!locked)
        console.log(!locked);
        
    }

    function handleClick() {
        PatchCableManager.handleClick(null)
        ProcessorTree.setSelected(-1)
    }

    function updateShowInfo(visible, position, id, ioletType, index) {        
        const object = ProcessorTree.objects[id]
        const type = (object.type).toLowerCase()
        const description = object.getIOLetDescription(ioletType, index)         
        setInfoPopup({ visible, position, text: type + ": " + description})
    }

    const renderRingoObjects = () => {
        const objects = []
        for (let i in ProcessorTree.objects) {
            switch (ProcessorTree.objects[i].type) {
                case OBJECT_TYPES.BUTTON:
                    objects.push(<RingoButton
                        key={i}
                        id={i}
                        position={{ x: ProcessorTree.objects[i].position.x, y: ProcessorTree.objects[i].position.y }}
                        numInlets={ProcessorTree.objects[i].numInlets}
                        numOutlets={ProcessorTree.objects[i].numOutlets}
                        updateShowInfo={updateShowInfo}
                        isLocked={locked}
                    />)
                    break;
                case OBJECT_TYPES.MESSAGE:
                    objects.push(<RingoMessage
                        key={i}
                        id={i}
                        position={{ x: ProcessorTree.objects[i].position.x, y: ProcessorTree.objects[i].position.y }}
                        numInlets={ProcessorTree.objects[i].numInlets}
                        numOutlets={ProcessorTree.objects[i].numOutlets}
                        updateShowInfo={updateShowInfo}
                        isLocked={locked}
                    />)
                    break;
                case OBJECT_TYPES.THREE_CANVAS:
                    objects.push(<RingoThree
                        key={i}
                        id={i}
                        position={{ x: ProcessorTree.objects[i].position.x, y: ProcessorTree.objects[i].position.y }}
                        numInlets={ProcessorTree.objects[i].numInlets}
                        numOutlets={ProcessorTree.objects[i].numOutlets}
                        updateShowInfo={updateShowInfo}
                        isLocked={locked}
                    />)
                    break;
                    case OBJECT_TYPES.SLIDER:
                        objects.push(<RingoSlider
                            key={i}
                            id={i}
                            position={{ x: ProcessorTree.objects[i].position.x, y: ProcessorTree.objects[i].position.y }}
                            numInlets={ProcessorTree.objects[i].numInlets}
                            numOutlets={ProcessorTree.objects[i].numOutlets}
                            updateShowInfo={updateShowInfo}
                            isLocked={locked}
                        />)
                        break;
    
                default:
                    objects.push(<RingoObject
                        key={i}
                        id={i}
                        position={{ x: ProcessorTree.objects[i].position.x, y: ProcessorTree.objects[i].position.y }}
                        numInlets={ProcessorTree.objects[i].numInlets}
                        numOutlets={ProcessorTree.objects[i].numOutlets}
                        updateShowInfo={updateShowInfo}
                        isLocked={locked}
                    />)
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

    return (
        <div className="App" ref={myRef} tabIndex="0" onClick={handleClick} onMouseMove={handleMouseMove} onKeyDown={handleKeyDown}>
            <Router>
                <Switch>
                    <Route exact path="/">
                        <div>
                            <div className='WorkSpace'>
                                {renderPatchCables()}
                                {renderRingoObjects()}
                                {
                                infoPopup.visible ? <IOLetDescriptionPopup 
                                position={infoPopup.position} 
                                text={infoPopup.text}/> : null
                                }
                            </div>
                            <Toolbar workspace={true} locked={locked}/>
                        </div>
                    </Route>
                    <Route exact path="/about">
                        <div>
                        <About />
                        <Toolbar workspace={false} locked={locked}/>
                        </div>
                    </Route>
                </Switch>
            </Router>
        </div>)
}

export default App;
