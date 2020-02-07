import React, { Component } from "react";
import { connect } from "react-redux";
import { addObject, removePatchCable } from '../actions/actions.js';
import { OBJECT_TYPES } from '../constants/object-types';
import { OBJECT_CONFIGS } from '../constants/object-configs';
import { Metro } from '../QuaxObjects/Metro.js'
import QuaxObject from './QuaxObject'
import '../../css/index.css';
import PatchCable from "./PatchCable.js";
import Toolbar from './Toolbar.js'

function mapStateToProps(state) {
    return {
        objects: state.objects,
        patchCableData: state.patchCableData
    }
}

function mapDispatchToProps(dispatch) {
    return {
        addObject: object => dispatch(addObject(object)),
        removePatchCable: patchCable => dispatch(removePatchCable(patchCable))
    };
}

function getObjectForType(type)
{
    if (type == OBJECT_TYPES.METRO)
        return new Metro();
}

class ConnectedApp extends Component {

    constructor(props) {
        super(props);
        this.createQuaxObject = this.createQuaxObject.bind(this);
        this.createPatchCable = this.createPatchCable.bind(this);

    }

    handleKeyDown(event) {
        // CREATE NEW OBJECT
        if (event.key == 'n' || event.key == 'N') {
            var newObject = OBJECT_CONFIGS[OBJECT_TYPES.EMPTY];
            newObject.id = new Date().getTime();
            newObject.position = {
                x: this.state.mousePosition.x,
                y: this.state.mousePosition.y,
            }
            this.props.addObject(newObject);
            
            return;
        }
    }

    handleMouseMove(event) {
        this.setState({
            mousePosition: {
                x: event.pageX,
                y: event.pageY
            }
        })
    }

    handleClick(e) {
        if (this.props.patchCableData.activePatchCable.id != -1) {
            this.props.removePatchCable({ id: this.props.patchCableData.activePatchCable.id })
        }
    }

    createQuaxObject(k) {        
        return <QuaxObject key={k} id={k} type={this.props.objects[k].type} position={this.props.objects[k].position} numInlets={this.props.objects[k].numInlets} numOutlets={this.props.objects[k].numOutlets}></QuaxObject>
    }

    createPatchCable(key) {
        var currentPatchCable = this.props.patchCableData.patchCables[key];
        if (key == this.props.patchCableData.activePatchCable.id) {
            return <PatchCable key={key} pos1={currentPatchCable.pos1} pos2={{ x: this.state.mousePosition.x, y: this.state.mousePosition.y }}></PatchCable>
        }
        return <PatchCable key={key} pos1={currentPatchCable.pos1} pos2={currentPatchCable.pos2}></PatchCable>
    }


    render() {
        return (
            <div className="App" tabIndex="0" onClick={this.handleClick.bind(this)} onMouseMove={this.handleMouseMove.bind(this)} onKeyDown={this.handleKeyDown.bind(this)}>
                <Toolbar></Toolbar>,
                    {Object.keys(this.props.objects).map(this.createQuaxObject)}
                {Object.keys(this.props.patchCableData.patchCables).map(this.createPatchCable)}

            </div>)
    }
}

const App = connect(
    mapStateToProps,
    mapDispatchToProps
)(ConnectedApp);
export default App;
