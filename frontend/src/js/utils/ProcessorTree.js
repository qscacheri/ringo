import * as Tone from 'tone'
import createObject from './object-creators'
import OBJECT_TYPES from '../constants/object-types';
import PatchCableManager from './PatchCableManager'
import { SrcAlphaSaturateFactor } from 'three';
import { Receiver } from '../RingoObjects/base/RingoObject';
import store from '../redux/store/store'
class ProcessorTreeClass {
    constructor() {
        this.context = new AudioContext();
        Tone.setContext(this.context)
        this.objects = {}
        this.newObjectCallback = null
        this.selectedObject = -1
        this.locked = false
        this.updateLock = null
    }

    resume() {        
        if (this.context.state !== 'running') {
            this.context.resume()
            console.log('resumed context');
        }
    }

    toggleLock() {
        this.locked = !this.locked
        this.updateLock(this.locked)
    }

    addObject(type = OBJECT_TYPES.EMPTY, x, y) {
        const objectID = new Date().getTime()
        this.objects[objectID] = createObject(this, type, {x, y})
        
        if (this.newObjectCallback) this.newObjectCallback()

        const numInlets = this.objects[objectID].numInlets
        const numOutlets = this.objects[objectID].numOutlets
        store.dispatch({type: 'NEW_OBJECT', payload: {id: objectID, position: {x, y}, type, numInlets, numOutlets}})
    }

    jsonToObject(id, object) {
        const type = object.type        
        this.objects[id] = createObject(this, type, object.position)
        for (let i = 0; i < object.receivers.length; i++)
        {
            this.objects[id].receivers.push(new Receiver(object.receivers[i]))
        }
        this.updateObject(id, object.text)
    }
    
    updateObject(id, objectText) {
        const splitText = objectText.split(' ');
        const type = splitText[0].toUpperCase()
        const position = this.objects[id].position
        
        if (type != this.objects[id].type) {
            this.objects[id] = createObject(this, type, position)
        }
        this.objects[id].updateAttributes(splitText)

        this.objects[id].text = objectText
        this.save()

        const numInlets = this.objects[id].numInlets
        const numOutlets = this.objects[id].numOutlets
        store.dispatch({type: 'NEW_OBJECT', payload: {id, position, type, numInlets, numOutlets}})

    }

    updateMessage(id, text) {
        this.objects[id].update(text)
    }

    triggerMessage(id) {
        this.objects[id].triggerMessage()
    }

    registerMessageCallback(id, callback) {
        this.objects[id].callback = callback
    }

    connectObjects(outputObject, inputObject) {
        this.objects[outputObject.id].connect(outputObject.ioletIndex, inputObject.ioletIndex, inputObject.id)
    }

    // Three functions
    initializeThree(id, width, height, callback) {
        return this.objects[id].initializeThree(width, height, callback)
    }

    setSelected(newSelected) {
        this.selectedObject = newSelected
    }

    deleteSelected() {
        // take care of patch cables coming out of outlets
        console.log('deleting object: ', this.selectedObject);

        // take care of objects/patch cables conneted to inlets
        for (let i in this.objects) {
            if (this.objects[i].isOutletConnectedTo(this.selectedObject)) {
                if (this.objects[i].disconnect)
                    this.objects[i].disconnect()
            }
        }

        if (this.objects[this.selectedObject].disconnect)
            this.objects[this.selectedObject].disconnect()
        delete this.objects[this.selectedObject]
        PatchCableManager.updateDeleted(this.selectedObject)

        store.dispatch({type: 'DELETE_OBJECT', payload: {id: this.selectedObject}})

        this.selectedObject = -1

        this.save()


    }

    save(file=null) {
        console.log('saving...');
        let patch = {
            objects: {}
        }
        if (!file) {
            for (let i in this.objects) {
                patch.objects[i] = this.objects[i].toJSON()
            }
            patch.patchCables = PatchCableManager.getCablesAsJSON()
        }

        else {

        }     
        console.log(patch)   
        return patch
    }

    load(state) {
        this.objects = {}
        for (let id in state.objects) {
            this.jsonToObject(id, state.objects[id])
            
            if (this.newObjectCallback) this.newObjectCallback(id)
        }

        PatchCableManager.loadFromJSON(state.patchCables)
        
        

    }

    deleteAll() {

    }

}

const ProcessorTree = new ProcessorTreeClass();
export default ProcessorTree;