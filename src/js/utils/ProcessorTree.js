import * as Tone from 'tone'
import NewQuaxObject from '../RingoObjects/NewQuaxObject'
import createObject from './object-creators'
import OBJECT_TYPES from '../constants/object-types';

class ProcessorTreeClass {
    constructor() {
        this.context = new AudioContext();
        Tone.setContext(this.context)
        this.objects = {}
        this.newObjectCallback = null
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
        const message = this.objects[id]
        message.attributes.data = text
    }

    triggerMessage(id) {
        this.objects[id].sendData()
    }

    registerMessageCallback(id, callback) {
        this.objects[id].callback = callback
    }

    connectObjects(outputObject, inputObject) {
        this.objects[outputObject.id].addReceiver(outputObject.outletIndex, inputObject.inletIndex, inputObject.id)
    }

    // Three functions
    initializeThree(id, width, height, callback) {
        return this.objects[id].initializeThree(width, height, callback)
    }

}

const ProcessorTree = new ProcessorTreeClass();
export default ProcessorTree;