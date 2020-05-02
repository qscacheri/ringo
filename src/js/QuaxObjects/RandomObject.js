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
        this.receivers = this.createReceiverArray(this.numOutlets)
        console.log(this.receivers);
        
    }

    sendData() {
        this.receivers.forEach(receiver => {
            console.log(this.receivers);
            
        });
    }

    receiveData(inlet, data) {
        switch (inlet) {
            case 0:
                this.sendData(0)
                return;
            case 1: 
                this.attributes.min = data
                return
            case 2:
                this.attributes.max = data
                return
        }
    }

    updateAttributes(newAttributes) {
        console.log('UPDATING ATTRIBUTES');
        
        if (newAttributes[1]) this.attributes.min = newAttributes[1]
        if (newAttributes[2]) this.attributes.max = newAttributes[2]
    }

    addReceiver(outletIndex, inletIndex, inputID) {
        debugger
        console.log(this.receivers);
        
        this.receivers[outletIndex][inputID] = inletIndex
    }
    
}

export default RandomObject