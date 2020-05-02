import NewQuaxObject from './NewQuaxObject'
import OBJECT_TYPES from '../constants/object-types'
import { Oscillator, Tone } from 'tone'

class OscillatorObject extends NewQuaxObject {
    constructor(processor) {
        super(processor)
        this.numInlets = 3
        this.numOutlets = 1
        this.attributes = {
            frequency: 220,
            type: 'sine'
        }
        this.type = OBJECT_TYPES.OSC
        this.audioNode = new Oscillator()
        this.audioNode.start()
        this.receivers = this.createReceiverArray(this.numOutlets)
    }
    
    sendData(data) {
        this.receivers.forEach(receiver => {
            
        });
    }

    receiveData(inlet, data) {
        switch (inlet) {
            case 0:
                return;
            case 1: 
                if (typeof(data) !== 'number') return
                this.attributes.frequency = data
                this.audioNode.frequency.value = this.attributes.frequency
                return
            case 2:
                this.attributes.type = data
                this.audioNode.type = this.attributes.type
                return
        }
    }

    updateAttributes(newAttributes) {                
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
        if (receiverObject.hasDSP) {
            this.audioNode.connect(receiverObject.audioNode)
        }
        this.audioNode.start()
    }
}

export default OscillatorObject