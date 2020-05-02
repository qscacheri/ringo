import NewQuaxObject from './NewQuaxObject'
import OBJECT_TYPES from '../constants/object-types'
import { UserMedia } from 'tone'

class InputObject extends NewQuaxObject {
    constructor(processor) {
        super(processor)
        this.numInlets = 1
        this.numOutlets = 1
        this.attributes = {
            open: true,
        }
        this.type = OBJECT_TYPES.INPUT
        this.audioNode = new UserMedia()
        this.audioNode.open()
        this.receivers = this.createReceiverArray(this.numOutlets)
    }
    
    sendData(data) {
        this.receivers.forEach(receiver => {
            
        });
    }

    receiveData(inlet, data) {
        switch (inlet) {
            default: 
                return
        }
    }

    updateAttributes(newAttributes) {                
    }

    addReceiver(outletIndex, inletIndex, inputID) {
        this.receivers[outletIndex][inputID] = inletIndex
        const receiverObject = this.processor.objects[inputID]
        console.log(this.processor.objects);
        if (receiverObject.hasDSP) {
            this.audioNode.connect(receiverObject.audioNode)
        }
    }
}

export default InputObject