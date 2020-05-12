import * as Tone from 'tone'
import createObject from './object-creators'
import OBJECT_TYPES from '../constants/object-types';
import PatchCableManager from './PatchCableManager'

class ProcessorTreeClass {
    constructor() {        
        this.context = new AudioContext();
        Tone.setContext(this.context)
        this.objects = {}
        this.newObjectCallback = null
        this.selectedObject = -1
    }

    addObject(type = OBJECT_TYPES.EMPTY) {
        const objectID = new Date().getTime()
        this.objects[objectID] = createObject(this, type)

        if (this.newObjectCallback) this.newObjectCallback()

    }

    updateObject(id, objectText) {
        const splitText = objectText.split(' ');
        const type = splitText[0].toUpperCase()
        if (type != this.objects[id].type) {
            this.objects[id] = createObject(this, type)
        }

        this.objects[id].updateAttributes(splitText)
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
                // delete this.objects[i].receivers[]
            }
        }

        delete this.objects[this.selectedObject]
        PatchCableManager.updateDeleted(this.selectedObject)
        this.selectedObject = -1
    }

}

const ProcessorTree = new ProcessorTreeClass();
export default ProcessorTree;