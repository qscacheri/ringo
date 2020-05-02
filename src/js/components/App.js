/* eslint-disable */

import React, { useState, useEffect } from "react";
import OBJECT_TYPES from '../constants/object-types';
import RingoObject from './RingoObject'
import '../../css/App.css';
import PatchCable from "./PatchCable";
import Toolbar from './Toolbar'
import RingoButton from './RingoButton'
import ProcessorTree from '../utils/ProcessorTree'
import PatchCableManager from '../utils/PatchCableManager'
import RingoMessage from "./RingoMessage";

function App(props) {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [render, setRender] = useState(true)
    useEffect(() => {
        ProcessorTree.newObjectCallback = () => {
            console.log('OBJECT ADDED');
            setRender(!render)
        }
        window.tree = ProcessorTree
    }, [])

    function handleKeyDown(e) {

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
            props.deleteObject({});
        }
    }

    function handleMouseMove(e) {
        setMousePosition({
            x: e.pageX,
            y: e.pageY
        })
    }

    function handleClick(e) {
        // if (props.patchCableData.activePatchCable.id != -1) {
        //     props.removePatchCable({ id: props.patchCableData.activePatchCable.id })
        // }
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
        const patchCables = []
        for (let i in PatchCableManager.patchCables) {
            if (i == PatchCableManager.activeCableID)
                patchCables.push(<PatchCable
                    key={i}
                    pos1={PatchCableManager.patchCables[i].pos1}
                    pos2={mousePosition}
                />)
            else
                patchCables.push(<PatchCable
                    key={i}
                    pos1={PatchCableManager.patchCables[i].pos1}
                    pos2={PatchCableManager.patchCables[i].pos2}
                />)

        }
        return patchCables
    }

    function createRingoObject(k) {
        return null
        // let type = props.objects[k].type;
        // switch (type) {
        //     case (OBJECT_TYPES.BUTTON):
        //         return <RingoButton key={k} id={k} type={props.objects[k].type} position={props.objects[k].position} numInlets={props.objects[k].numInlets} numOutlets={props.objects[k].numOutlets} />
        //     case (OBJECT_TYPES.CANVAS):
        //         return <P5Canvas key={k} id={k} type={props.objects[k].type} position={props.objects[k].position} numInlets={props.objects[k].numInlets} numOutlets={props.objects[k].numOutlets} />
        //     default:
        //         return <RingoObject key={k} id={k} type={props.objects[k].type} position={props.objects[k].position} numInlets={props.objects[k].numInlets} numOutlets={props.objects[k].numOutlets} />

        // }
    }

    function createPatchCable(key) {
        var currentPatchCable = props.patchCableData.patchCables[key];
        if (key == props.patchCableData.activePatchCable.id) {
            return <PatchCable key={key} pos1={currentPatchCable.pos1} pos2={{ x: mousePosition.x, y: mousePosition.y }}></PatchCable>
        }
        return <PatchCable key={key} pos1={currentPatchCable.pos1} pos2={currentPatchCable.pos2}></PatchCable>
    }

    return (
        <div className="App" tabIndex="0" onClick={handleClick} onMouseMove={handleMouseMove} onKeyDown={handleKeyDown}>
            <Toolbar />
            {renderPatchCables()}
            {renderRingoObjects()}

            {/* {Object.keys(props.objects).map(createRingoObject)}
            {Object.keys(props.patchCableData.patchCables).map(createPatchCable)} */}
        </div>)
}

export default App;
