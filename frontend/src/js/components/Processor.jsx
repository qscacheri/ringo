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
        this.context = new AudioContext();
        Tone.setContext(this.context)
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

        this.patchAsJSON = null
        window.processor = this
        this.patchCablesAsString = ""
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
        if (this.context.state !== 'running')
            this.context.resume()
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
        for (let i = 0; i < object.receivers.length; i++) {
            newObject.receivers.push(new Receiver(object.receivers[i]))
        }
        return newObject
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
        const objects = {}
        for (let id in patch.objects) {
            let newObject = this.jsonToObject(id, patch.objects[id])
            objects[id] = newObject
        }
        this.setState({objects, patchName})
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
