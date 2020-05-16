import * as Tone from 'tone'
import createObject from './object-creators'
import OBJECT_TYPES from '../constants/object-types';
import PatchCableManager from './PatchCableManager'
import { SrcAlphaSaturateFactor } from 'three';

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

    }

    jsonToObject(id, object) {
        const type = object.type
        console.log(object.position);
        
        this.objects[id] = createObject(this, type, object.position)
        this.updateObject(id, object.text)
    }
    
    updateObject(id, objectText) {
        console.log(objectText);
        const splitText = objectText.split(' ');
        const type = splitText[0].toUpperCase()
        const position = this.objects[id].position
        console.log(position);
        
        if (type != this.objects[id].type) {
            this.objects[id] = createObject(this, type, position)
        }
        this.objects[id].updateAttributes(splitText)

        this.objects[id].text = objectText
        this.save()
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
            console.log(this.objects[i]);

            if (this.objects[i].isOutletConnectedTo(this.selectedObject)) {
                if (this.objects[i].disconnect)
                    this.objects[i].disconnect()
            }
        }

        if (this.objects[this.selectedObject].disconnect)
            this.objects[this.selectedObject].disconnect()
        delete this.objects[this.selectedObject]
        PatchCableManager.updateDeleted(this.selectedObject)
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
        }

        else {

        }        
        return patch
    }

    load(state) {
        this.objects = {}
        for (let id in state.objects) {
            console.log(state.objects[id]);
            this.jsonToObject(id, state.objects[id])
            
            if (this.newObjectCallback) this.newObjectCallback(id)
        }

        console.log(this.objects);
    }

    deleteAll() {

    }

}

const ProcessorTree = new ProcessorTreeClass();
export default ProcessorTree;