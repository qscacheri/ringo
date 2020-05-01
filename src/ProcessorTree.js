import * as Tone from 'tone'
import NewQuaxObject from './js/QuaxObjects/NewQuaxObject'
import RandomObject from './js/QuaxObjects/RandomObject'

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

    connectObject(outputObjectID, inputObjectID) {

    }

    updateObject(id, objectText) {
        const splitText = objectText.split(' ');
        const type = splitText[0].toUpperCase()
        console.log(type);
        console.log(this.objects[id].type);
        
        if (type != this.objects[id].type) {
            this.objects[id] = new RandomObject(this)
        }

        this.objects[id].updateAttributes(splitText)                
    }
}

const ProcessorTree = new ProcessorTreeClass();
export default ProcessorTree;