import React from 'react'
import * as Tone from 'tone'
import createObject from '../utils/object-creators'
import OBJECT_TYPES from '../constants/object-types';
import PatchCableManager from './PatchCableManager'
import Receiver from '../utils/Receiver'

const Context = React.createContext()
const Provider = Context.Provider

class Processor extends React.Component {
    constructor(props) {
        super(props)
        this.context = new AudioContext();
        Tone.setContext(this.context)
        this.state = {
            objects: {},
            locked: false
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

        this.patchAsJSON = null
        window.processor = this
        this.patchCablesAsString = ""

    }

    componentDidMount() {        
        if (localStorage.getItem('patch')) this.load(localStorage.getItem('patch'))
    }

    componentDidUpdate() {
        console.log(this.state.objects);
        
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
        this.setState({ objects: {...this.state.objects, [objectID]: createObject(this, type, { x, y })}}, () => console.log(this.state))
    }

    updatePosition(id, position) {
        // this.state.objects[id].position = position
        const object = this.state.objects[id]
        object.position =        position
        this.setState({ 
            objects: {...this.state.objects, [id]: object}
        })
    }

    updateObject(id, objectText, textOnly = false) {
        if (textOnly) {
            this.state.objects[id].text = objectText
            this.setState({ objects: this.state.objects })
            return
        }

        const splitText = objectText.split(' ');
        const type = splitText[0].toUpperCase()
        const position = this.state.objects[id].position

        if (type != this.state.objects[id].type) {
            this.state.objects[id] = createObject(this, type, position)
        }
        this.state.objects[id].updateAttributes(splitText)

        this.state.objects[id].text = objectText
        this.setState({ objects: this.state.objects })
    }

    connectObjects(outputObject, inputObject) {
        this.state.objects[outputObject.id].connect(outputObject.ioletIndex, inputObject.ioletIndex, inputObject.id)
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
        this.state.objects[id] = createObject(this, type, object.position)
        for (let i = 0; i < object.receivers.length; i++) {
            this.state.objects[id].receivers.push(new Receiver(object.receivers[i]))
        }
        this.updateObject(id, object.text)
        this.setState({ objects: this.state.objects })
    }

    save() {
        let patch = JSON.parse(localStorage.getItem('patch'))
        if (!patch) 
            patch = {objects: {}, patchCables: {}}
        const objects = {}
        console.log(this.state.objects);
        
        for (let i in this.state.objects) {
            console.log(this.state.objects[i]);
            
            objects[i] = this.state.objects[i].toJSON()
        }
        patch.objects = objects
        localStorage.setItem("patch", JSON.stringify(patch))
    }

    load(patch) {
        console.log('loading objects...');
        patch = JSON.parse(patch)
        this.state.objects = {}
        for (let id in patch.objects) {
            this.jsonToObject(id, patch.objects[id])
        }
    }

    render() {
        const value = {
            ...this.state,
            addObject: this.addObject,
            resume: this.resume,
            updateObject: this.updateObject,
            updatePosition: this.updatePosition,
            toggleLock: this.toggleLock,
            initializeThree: this.initializeThree
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
