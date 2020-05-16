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
        this.objects[objectID] = createObject(this, type)
        this.objects[objectID].position.x = x
        this.objects[objectID].position.y = y

        if (this.newObjectCallback) this.newObjectCallback()

    }

    updateObject(id, objectText) {
        const splitText = objectText.split(' ');
        const type = splitText[0].toUpperCase()
        const position = this.objects[id].position

        if (type != this.objects[id].type) {
            this.objects[id] = createObject(this, type)
        }
        this.objects[id].position = position
        this.objects[id].updateAttributes(splitText)

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
        
        if (!file) {
            for (let i in this.objects) {
                console.log(this.objects[i].toJSON())
            }
        }

        else {

        }

    }

}

const ProcessorTree = new ProcessorTreeClass();
export default ProcessorTree;