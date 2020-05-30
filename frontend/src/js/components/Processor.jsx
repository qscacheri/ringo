import React from 'react'
import * as Tone from 'tone'
import createObject from '../utils/object-creators'
import OBJECT_TYPES from '../constants/object-types';
import PatchCableManager from './PatchCableManager'
import {Receiver} from '../RingoObjects/base/RingoObject'

const Context = React.createContext()
const Provider = Context.Provider

class Processor extends React.Component {
    constructor(props) {
        super(props)
        this.context = new AudioContext();
        Tone.setContext(this.context)
        this.state = {
            objects: {},
            patchCables: {},
            locked: false
        }
        this.addObject = this.addObject.bind(this)
        this.updateObject = this.updateObject.bind(this)
        this.connectObjects = this.connectObjects.bind(this)
        this.triggerMessage = this.triggerMessage.bind(this)
        this.toggleLock = this.toggleLock.bind(this)
        this.jsonToObject = this.jsonToObject.bind(this)
        this.save = this.save.bind(this)
        this.load = this.load.bind(this)

        this.patchAsJSON = null
        window.processor = this
        this.patchCablesAsString = ""

    }
    
    componentDidMount() {
        if (localStorage.getItem('patch')) this.load(localStorage.getItem('patch'))
    }

    resume() {        
        if (this.context.state !== 'running') 
            this.context.resume()
    }

    toggleLock() {
        this.setState({locked: !this.state.locked})
    }

    addObject(type = OBJECT_TYPES.EMPTY, x, y) {
        
        const objectID = 'ro-' + new Date().getTime()
        console.log(objectID);

        this.state.objects[objectID] = createObject(this, type, {x, y})

        this.setState({objects: this.state.objects}, () => console.log(this.state))        
    }

    updateObject(id, objectText, textOnly=false) {
        if (textOnly) {
            this.state.objects[id].text = objectText
            this.setState({objects: this.state.objects})     
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
        this.setState({objects: this.state.objects})
        this.save()
    }

    connectObjects(outputObject, inputObject) {
        this.state.objects[outputObject.id].connect(outputObject.ioletIndex, inputObject.ioletIndex, inputObject.id)
    }

    triggerMessage(id) {
        this.objects[id].triggerMessage()
    }

    // ***********************RECALL*********************
    jsonToObject(id, object) {

        const type = object.type        
        this.state.objects[id] = createObject(this, type, object.position)
        for (let i = 0; i < object.receivers.length; i++)
        {
            this.state.objects[id].receivers.push(new Receiver(object.receivers[i]))
        }
        this.updateObject(id, object.text)
        this.setState({objects: this.state.objects})
    }

    save() {
        console.log('saving...');
        let patch = {
            objects: {}
        }
            for (let i in this.state.objects) {
                patch.objects[i] = this.state.objects[i].toJSON()
            }
            patch.patchCables = this.patchCablesAsString
        
        localStorage.setItem("patch", JSON.stringify(patch))
    }

    load(patch) {
        patch = JSON.parse(patch)        
        this.state.objects = {}
        for (let id in patch.objects) {
            console.log(id);
            
            this.jsonToObject(id, patch.objects[id])
            
            if (this.newObjectCallback) this.newObjectCallback(id)
        }
    }

    render() {
        const value = {
            ...this.state,
            addObject: this.addObject,
            resume: this.resume,
            updateObject: this.updateObject,
            toggleLock: this.toggleLock
        }

        return (
            <Provider value={value}>
                <PatchCableManager connectObjects={this.connectObjects} updateCables={(string) => this.patchCablesAsString = string}> 
                    {this.props.children}
                </PatchCableManager> 
            </Provider>
        )
    }


}
export {Context}
export default Processor
