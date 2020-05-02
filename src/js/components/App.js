/* eslint-disable */

import React, { useState, useEffect } from "react";
import OBJECT_TYPES from '../constants/object-types';
import QuaxObject from './QuaxObject'
import '../../css/index.css';
import PatchCable from "./PatchCable";
import Toolbar from './Toolbar'
import QuaxButton from './QuaxButton'
import ProcessorTree from '../../ProcessorTree'
import PatchCableManager from '../utils/PatchCableManager'

function App(props) {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [render, setRender] = useState(true)
    useEffect(() => {
        ProcessorTree.newObjectCallback = () => {
            console.log('OBJECT ADDED');
            setRender(!render)
        }
    }, [])

    function handleKeyDown(e) {

        // CREATE NEW OBJECT
        if (e.key == 'n' || e.key == 'N') {

            // var newObject = OBJECT_CONFIGS[OBJECT_TYPES.EMPTY];
            // newObject.id = new Date().getTime();
            // newObject.position = {
            //     x: mousePosition.x,
            //     y: mousePosition.y,
            // }
            // props.addObject(newObject);

            ProcessorTree.addObject();
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

    const renderQuaxObjects = () => {
        const objects = []
        for (let i in ProcessorTree.objects) {
            switch (ProcessorTree.objects[i].type) {
                case OBJECT_TYPES.BUTTON:
                    objects.push(<QuaxButton
                        key={i}
                        id={i}
                        position={{ x: 100, y: 100 }}
                        numInlets={ProcessorTree.objects[i].numInlets}
                        numOutlets={ProcessorTree.objects[i].numOutlets}
                    />)
                    break;

                default:
                    objects.push(<QuaxObject
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

    function createQuaxObject(k) {
        return null
        // let type = props.objects[k].type;
        // switch (type) {
        //     case (OBJECT_TYPES.BUTTON):
        //         return <QuaxButton key={k} id={k} type={props.objects[k].type} position={props.objects[k].position} numInlets={props.objects[k].numInlets} numOutlets={props.objects[k].numOutlets} />
        //     case (OBJECT_TYPES.CANVAS):
        //         return <P5Canvas key={k} id={k} type={props.objects[k].type} position={props.objects[k].position} numInlets={props.objects[k].numInlets} numOutlets={props.objects[k].numOutlets} />
        //     default:
        //         return <QuaxObject key={k} id={k} type={props.objects[k].type} position={props.objects[k].position} numInlets={props.objects[k].numInlets} numOutlets={props.objects[k].numOutlets} />

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
            {renderQuaxObjects()}

            {/* {Object.keys(props.objects).map(createQuaxObject)}
            {Object.keys(props.patchCableData.patchCables).map(createPatchCable)} */}
        </div>)
}

export default App;
