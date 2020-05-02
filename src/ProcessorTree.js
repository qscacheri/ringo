import * as Tone from 'tone'
import NewQuaxObject from './js/QuaxObjects/NewQuaxObject'
import RandomObject from './js/QuaxObjects/RandomObject'
import createObject from './js/utils/object-creators'

class ProcessorTreeClass
{
    constructor()
    {
        this.context = new AudioContext();
        Tone.setContext(this.context)
        this.objects = {}
        this.newObjectCallback = null
    }

    addObject() {
        const objectID = new Date().getTime()
        this.objects[objectID] = new NewQuaxObject(this)
        
        if (this.newObjectCallback) this.newObjectCallback()
    }

    updateObject(id, objectText) {
        const splitText = objectText.split(' ');
        const type = splitText[0].toUpperCase()
        console.log(type);
        console.log(this.objects[id].type);
        
        if (type != this.objects[id].type) {
            this.objects[id] = createObject(this, type)
        }

        this.objects[id].updateAttributes(splitText)                
    }

    connectObjects(outputObject, inputObject) {
        this.objects[outputObject.id].addReceiver(outputObject.outletIndex, inputObject.inletIndex, inputObject.id)        
    }

}

const ProcessorTree = new ProcessorTreeClass();
export default ProcessorTree;