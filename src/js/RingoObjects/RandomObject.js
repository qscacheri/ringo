import NewQuaxObject from './NewQuaxObject'
import OBJECT_TYPES from '../constants/object-types'

class RandomObject extends NewQuaxObject {
    constructor(processor) {
        super(processor)
        this.numInlets = 3
        this.numOutlets = 1
        this.attributes = {
            min: 0,
            max: 1
        }
        this.type = OBJECT_TYPES.RANDOM
        this.hasDSP = true
        this.receivers = []
    }

    receiveData(inlet, data) {
        switch (inlet) {
            case 0:
                this.processData()
                return;
            case 1: 
                this.attributes.min = data
                return
            case 2:
                this.attributes.max = data
                return
        }
    }

    processData() {
        const randVal = this.attributes.min + Math.random() * (this.attributes.min + this.attributes.max)
        debugger
        this.sendData(randVal)
    }

    updateAttributes(newAttributes) {
        if (newAttributes[1]) this.attributes.min = parseFloat(newAttributes[1])
        if (newAttributes[2]) this.attributes.max = parseFloat(newAttributes[2])
    }
    
}

export default RandomObject