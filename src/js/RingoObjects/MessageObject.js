import NewQuaxObject from './NewQuaxObject'
import OBJECT_TYPES from '../constants/object-types'

class MessageObject extends NewQuaxObject {
    constructor(processor) {
        super(processor)
        this.numInlets = 2
        this.numOutlets = 1
        this.attributes = {
            data: ''
        }
        this.type = OBJECT_TYPES.MESSAGE
        this.receivers = this.createReceiverArray(this.numOutlets)
        this.callback = null
    }

    sendData() {        
        let sendData = parseFloat(this.attributes.data)
        if (isNaN(sendData))
            sendData = this.attributes.data
        for (let i in this.receivers[0]) {
            this.processor.objects[i].receiveData(this.receivers[0][i], sendData)
        }        
    }

    receiveData(inlet, data) {
        switch (inlet) {
            case 0:
                this.sendData(0)
                return;
            case 1: 
                this.attributes.data = data
                this.callback(data)
                return
        }
    }

    updateAttributes(newAttributes) {
        
    }

    addReceiver(outletIndex, inletIndex, inputID) {
        this.receivers[outletIndex][inputID] = inletIndex
    }
    
}

export default MessageObject