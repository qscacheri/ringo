import NewQuaxObject from './NewQuaxObject'
import OBJECT_TYPES from '../constants/object-types'
import { Oscillator, Tone } from 'tone'

class OscillatorObject extends NewQuaxObject {
    constructor(processor) {
        super(processor)
        this.numInlets = 2
        this.numOutlets = 1
        this.attributes = {
            frequency: 220,
            type: 'sine'
        }
        this.type = OBJECT_TYPES.SINE
        this.audioNode = new Oscillator()
        this.audioNode.start()
        this.receivers = this.createReceiverArray(this.numOutlets)
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
        if (newAttributes.name) console.log('OBJECT MODE');
                
        if (newAttributes[1]) {
            this.attributes.frequency = parseFloat(newAttributes[1])
            this.audioNode.frequency.value = this.attributes.frequency
        }

        if (newAttributes[2]) {
            this.attributes.frequency = newAttributes[2]
            this.audioNode.frequency.type = this.attributes.type
        }
    }

    addReceiver(outletIndex, inletIndex, inputID) {
        this.receivers[outletIndex][inputID] = inletIndex
        const receiverObject = this.processor.objects[inputID]
        console.log(this.processor.objects);
        debugger
        if (receiverObject.hasDSP) {
            this.audioNode.connect(receiverObject.audioNode)
        }
        this.audioNode.start()
        console.log(this.audioNode, 'connected to ', receiverObject.audioNode);
        
    }
}

export default OscillatorObject