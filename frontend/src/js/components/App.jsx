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
import {connect} from 'react-redux'

const mapStateToProps = (state) => {
    return ({
        objects: state.objects, 
        activePatchCableID: state.activePatchCableID
    })
}

function App({objects, activePatchCableID}) {
    let mousePosRef = useRef({x: 0, y: 0})
    const [mousePosition, setMousePostion] = useState({x: 0, y: 0})
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
        window.manager = PatchCableManager

        ProcessorTree.updateLock = (isLocked) => {            
            setLocked(isLocked)
        }

        let state = localStorage.getItem('session')
        if (state) {
            state = JSON.parse(state)
            ProcessorTree.load(state)
        }

        window.onbeforeunload = () => {
            ProcessorTree.save()
            return ""
        }      
    }, [])

    function handleKeyDown(e) {
        // CREATE NEW OBJECT
        if (e.key == 'n' || e.key == 'N') {
            ProcessorTree.addObject(OBJECT_TYPES.EMPTY, mousePosRef.current.x, mousePosRef.current.y);
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

    function handleMouseMove(e) {
            mousePosRef.current = {
                x: e.pageX,
                y: e.pageY
            }

        if (activePatchCableID !== -1) {
            setMousePostion({
                x: e.pageX,
                y: e.pageY
            })    
        }
    }

    function lock() {
        setLocked(!locked)        
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
        const renderObjects = []
        for (let i in objects) {
            
            let sharedProps = {
                key: i,
                id: i,
                position: { x: objects[i].position.x, y: objects[i].position.y },
                numInlets: objects[i].numInlets,
                numOutlets: objects[i].numOutlets,
                updateShowInfo: updateShowInfo,
                isLocked: locked
            }
    
            switch (objects[i].type) {
                case OBJECT_TYPES.BUTTON:
                    renderObjects.push(<RingoButton {...sharedProps} />)
                    break;
                case OBJECT_TYPES.MESSAGE:
                    renderObjects.push(<RingoMessage {...sharedProps} />)
                    break;
                case OBJECT_TYPES.THREE_CANVAS:
                    renderObjects.push(<RingoThree {...sharedProps} />)
                    break;
                case OBJECT_TYPES.SLIDER:
                    renderObjects.push(<RingoSlider {...sharedProps} />)
                    break;
                default:
                    renderObjects.push(<RingoObject {...sharedProps}/>)
                    break;
            }
        }
        return renderObjects
    }

    const renderPatchCables = () => {
        const patchCables = []
        
        for (let i in PatchCableManager.patchCables) {            
            if (i == PatchCableManager.activeCableID)
                patchCables.push(<PatchCable
                    key={i}
                    pos1={PatchCableManager.patchCables[i].getActivePosition()}
                    pos2={mousePosRef.current}
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

export default connect(mapStateToProps)(App)
