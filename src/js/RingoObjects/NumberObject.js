import NewQuaxObject from './NewQuaxObject'
import OBJECT_TYPES from '../constants/object-types'

class NumberObject extends NewQuaxObject {
    constructor(processor) {
        super(processor)
        this.numInlets = 2
        this.numOutlets = 1
        this.attributes = {
            value: 0
        }
        this.type = OBJECT_TYPES.NUMBER
        this.receivers = this.createReceiverArray(this.numOutlets)
    }

    sendData(data) {
        for (let i in this.receivers[0]) {
            this.processor.objects[i].receiveData(this.receivers[0][i], this.attributes.value)
        }        
    }

    receiveData(inlet, data) {
        switch (inlet) {
            case 0:
                this.sendData(this.attributes.value)
                return;
            case 1:
                this.attributes.value = parseFloat(data)
                return
        }
    }

    updateAttributes(newAttributes) {
        if (newAttributes[1]) this.attributes.value = parseFloat(newAttributes[1])
    }

    addReceiver(outletIndex, inletIndex, inputID) {
        this.receivers[outletIndex][inputID] = inletIndex
    }
}

export default NumberObject