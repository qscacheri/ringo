import NewQuaxObject from './NewQuaxObject'
import OBJECT_TYPES from '../constants/object-types'

class ButtonObject extends NewQuaxObject {
    constructor(processor) {
        super(processor)
        this.numInlets = 1
        this.numOutlets = 1
        this.type = OBJECT_TYPES.BUTTON
        this.receivers = this.createReceiverArray(this.numOutlets)

    }

    sendData() {
        for (let i in this.receivers) {
            let currentReceiver = this.processor.objects[i]
            currentReceiver.receiveData(0, 'BANG')
        }
    }

    receiveData(inlet, data) {
        sendData()
    }

    updateAttributes(newAttributes) {
        if (newAttributes[1]) this.attributes.min = newAttributes[1]
        if (newAttributes[2]) this.attributes.max = newAttributes[2]
    }
}

export default ButtonObject