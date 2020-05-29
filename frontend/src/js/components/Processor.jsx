import React from 'react'
import * as Tone from 'tone'
import createObject from '../utils/object-creators'
import OBJECT_TYPES from '../constants/object-types';
import PatchCableManager from './PatchCableManager'

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

        window.state = this.state
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
    }

    connectObjects(outputObject, inputObject) {
        this.state.objects[outputObject.id].connect(outputObject.ioletIndex, inputObject.ioletIndex, inputObject.id)
    }

    triggerMessage(id) {
        this.objects[id].triggerMessage()
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
                <PatchCableManager connectObjects={this.connectObjects}> 
                    {this.props.children}
                </PatchCableManager> 
            </Provider>
        )
    }


}
export {Context}
export default Processor
