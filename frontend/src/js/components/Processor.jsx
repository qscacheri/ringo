import React from 'react'
import * as Tone from 'tone'
import OBJECT_TYPES from '../constants/object-types';
import PatchCableManager from './PatchCableManager'
import Receiver from '../utils/Receiver'
import createRingoObject from '../utils/RingoObjects';

const Context = React.createContext()
const Provider = Context.Provider

class Processor extends React.Component {
    constructor(props) {
        super(props)
        this.audioContext = new AudioContext()
        Tone.setContext(this.audioContext)
        this.state = {
            loading: false,
            objects: {},
            locked: false,
            patchName: 'Untitled'
        }
        this.addObject = this.addObject.bind(this)
        this.updateObject = this.updateObject.bind(this)
        this.connectObjects = this.connectObjects.bind(this)
        this.triggerMessage = this.triggerMessage.bind(this)
        this.toggleLock = this.toggleLock.bind(this)
        this.jsonToObject = this.jsonToObject.bind(this)
        this.initializeThree = this.initializeThree.bind(this)
        this.save = this.save.bind(this)
        this.load = this.load.bind(this)
        this.updateCables = this.updateCables.bind(this)
        this.updatePosition = this.updatePosition.bind(this)
        this.updateStateObject = this.updateStateObject.bind(this)
        this.resume = this.resume.bind(this)
        this.patchAsJSON = null
        window.processor = this
        this.patchCablesAsString = ""
        this.reconnectObjects = this.reconnectObjects.bind(this)
    }

    updateStateObject(id, propertyPairs) {
        const object = this.state.objects[id]
        for (let i = 0; i < propertyPairs.length; i++) {
            object[propertyPairs[i].property] = propertyPairs[i].value
        }
        this.setState({objects: {...this.state.objects, [id]: object}})
    }

    componentDidMount() {        
        if (localStorage.getItem('patch')) this.load(localStorage.getItem('patch'))
        else this.setState({loading: false})
    }

    componentDidUpdate() {
        if (!this.state.loading)
            this.save()
    }

    updateCables(cablesAsString) {

        this.patchCablesAsString = cablesAsString
    }

    resume() {
        console.log(this.audioContext);
        
        if (this.audioContext.state !== 'running') {
            this.audioContext.resume()
            console.log('resumed audio context');
        }
        for (let i in this.state.objects) {
            if (this.state.objects[i].resume) this.state.objects[i].resume()
        }
    }

    toggleLock() {
        this.setState({ locked: !this.state.locked })
    }

    addObject(type = OBJECT_TYPES.EMPTY, x, y) {
        
        const objectID = 'ro-' + new Date().getTime()
        this.setState({ objects: {...this.state.objects, [objectID]: createRingoObject(type, this, { x, y })}}, () => console.log(this.state))
    }

    updatePosition(id, position) {
        this.updateStateObject(id, [{property:'position', value: position}])
    }

    updateObject(id, objectText, textOnly = false) {
        if (textOnly) {
            this.updateStateObject(id, [{text: objectText}])
            return
        }

        const splitText = objectText.split(' ');
        const type = splitText[0].toUpperCase()
        const position = this.state.objects[id].position
        let object
        if (type !== this.state.objects[id].type) {
            object = createRingoObject(type, this, position, splitText)
        }
        else 
            object = this.state.objects[id]
        
        object.text = objectText
        this.setState({ objects: {...this.state.objects, [id]: object} })
    }

    connectObjects(outputObject, inputObject) {
        const objectWithNewReceiver = this.state.objects[outputObject.id]
        objectWithNewReceiver.connect(outputObject.ioletIndex, inputObject.ioletIndex, inputObject.id)
        this.setState({objects: {...this.state.objects, [outputObject.id]: objectWithNewReceiver}})
    }

    triggerMessage(id) {
        this.objects[id].triggerMessage()
    }

    initializeThree(id, width, height, callback) {
        return this.state.objects[id].initializeThree(width, height, callback)
    }

    // ***********************RECALL*********************
    jsonToObject(id, object) {

        const type = object.type
        const newObject = createRingoObject(type, this, object.position, object.attributes)
        newObject.text = object.text
        // for (let i = 0; i < object.receivers.length; i++) {
        //     newObject.receivers.push(new Receiver(object.receivers[i]))
        // }
        return newObject
    }

    reconnectObjects(json) {
        console.log(json);
        console.log(this.state.objects);

        for (let i in this.state.objects) {
            let object = this.state.objects[i]
            let jsonObject = json[i]
            for (let receiver = 0; receiver < jsonObject.receivers.length; receiver++) {
                let currentReceiver = jsonObject.receivers[receiver]                
                for (let pair = 0; pair < currentReceiver.pairs.length; pair++) {
                    object.connect(currentReceiver.pairs[pair].outlet, currentReceiver.pairs[pair].inlet, currentReceiver.id)
                }
                this.setState({objects: {...this.state.objects, [i]: object}})
            }
        }
    }

    save() {
        let patch = JSON.parse(localStorage.getItem('patch'))
        if (!patch)
            patch = {}
        const objects = {}
        for (let i in this.state.objects) {
            objects[i] = this.state.objects[i].toJSON()
        }
        patch.objects = objects
        patch.patchName = this.state.patchName
        console.log(patch);
        
        localStorage.setItem("patch", JSON.stringify(patch))
    }

    load(patch) {
        console.log('loading objects...');
        patch = JSON.parse(patch)
        const patchName = patch.patchName
        let objects = {}
        for (let id in patch.objects) {
            let newObject = this.jsonToObject(id, patch.objects[id])
            objects[id] = newObject
        }
        // objects = this.reconnectObjects(objects, patch.objects)
        console.log(patch.objects);
        
        this.setState({objects, patchName}, () => this.reconnectObjects(patch.objects))
    }
    
    updatePatchName(newName) {
        this.setState({patchName: newName})
    }

    render() {
        const value = {
            ...this.state,
            addObject: this.addObject,
            resume: this.resume,
            updateObject: this.updateObject,
            updatePosition: this.updatePosition,
            toggleLock: this.toggleLock,
            initializeThree: this.initializeThree,
            resume: this.resume,
            setPatchName: (newName) => this.setState({patchName: newName})
        }

        return (
            <Provider value={value}>
                <PatchCableManager connectObjects={this.connectObjects} updateCables={this.updateCables}>
                    {this.props.children}
                </PatchCableManager>
            </Provider>
        )
    }


}
export { Context }
export default Processor
