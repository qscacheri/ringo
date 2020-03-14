/* eslint-disable */

import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { addObject, removePatchCable, deleteObject, dspCreateSuccess } from '../actions/actions.js';
import { OBJECT_TYPES } from '../constants/object-types';
import { OBJECT_CONFIGS } from '../constants/object-configs';
import { Metro } from '../QuaxObjects/Metro.js'
import QuaxObject from './QuaxObject'
import '../../css/index.css';
import PatchCable from "./PatchCable";
import Toolbar from './Toolbar'
import P5Canvas from "./P5Canvas";
import QuaxButton from './QuaxButton'
import { Clock } from 'tone'
import Message from './Message'
import ToneMager from './ToneManager'

import OBJECT_CALLBACKS from "../constants/object-callbacks.js";
import ToneManager from "./ToneManager";
function mapStateToProps(state) {
    return {
        objects: state.objects,
        patchCableData: state.patchCableData,
        newDSPObject: state.newDSPObject,
        newToneConnection: state.newToneConnection
    }
}

function mapDispatchToProps(dispatch) {
    return {
        addObject: object => dispatch(addObject(object)),
        removePatchCable: patchCable => dispatch(removePatchCable(patchCable)),
        deleteObject: objectId => dispatch(deleteObject(objectId)),
        dspCreateSuccess: () => dispatch(dspCreateSuccess({}))
    }
};

function getObjectForType(type) {
    if (type == OBJECT_TYPES.METRO)
        return new Metro();
}

function ConnectedApp(props) {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [dspObjects, updateDSPObjects] = useState({});
    const [clock, setClock] = useState(new Clock(cb, .001));
    clock.start();
    function cb(time) {
        console.log(time);

    }

    useEffect(() => {
    });



    function handleKeyDown(e) {

        // CREATE NEW OBJECT
        if (e.key == 'n' || e.key == 'N') {

            var newObject = OBJECT_CONFIGS[OBJECT_TYPES.EMPTY];
            newObject.id = new Date().getTime();
            newObject.position = {
                x: mousePosition.x,
                y: mousePosition.y,
            }
            props.addObject(newObject);

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
        if (props.patchCableData.activePatchCable.id != -1) {
            props.removePatchCable({ id: props.patchCableData.activePatchCable.id })
        }
    }

    function objectTypeChanged(stuff) {

    }

    function createQuaxObject(k) {
        let type = props.objects[k].type;
        switch (type) {
            case (OBJECT_TYPES.BUTTON):
                return <QuaxButton key={k} id={k} objectTypeChanged={objectTypeChanged} type={props.objects[k].type} position={props.objects[k].position} numInlets={props.objects[k].numInlets} numOutlets={props.objects[k].numOutlets} />
            case (OBJECT_TYPES.CANVAS):
                return <P5Canvas key={k} id={k} objectTypeChanged={objectTypeChanged} type={props.objects[k].type} position={props.objects[k].position} numInlets={props.objects[k].numInlets} numOutlets={props.objects[k].numOutlets} />
            default:
                return <QuaxObject key={k} id={k} objectTypeChanged={objectTypeChanged} type={props.objects[k].type} position={props.objects[k].position} numInlets={props.objects[k].numInlets} numOutlets={props.objects[k].numOutlets} />

        }
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
            <Toolbar />,
                {Object.keys(props.objects).map(createQuaxObject)}
            {Object.keys(props.patchCableData.patchCables).map(createPatchCable)}
            <ToneManager/>
        </div>)
}

const App = connect(
    mapStateToProps,
    mapDispatchToProps
)(ConnectedApp);
export default App;
