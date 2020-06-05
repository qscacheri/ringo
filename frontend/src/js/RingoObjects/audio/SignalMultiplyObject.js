import RingoAudioObject from '../base/RingoAudioObject'
import OBJECT_TYPES from '../../constants/object-types'
import { Gain } from 'tone'

class SignalMultiplyObject extends RingoAudioObject {
    static type = OBJECT_TYPES.GAIN

    constructor(id, processor, position, attributes) {
        super(id, processor, position, attributes)
        this.numInlets = 2
        this.numOutlets = 1
        this.attributes = {
            gain: 1
        }
        this.audioNode = new Gain()
        this.receivers = this.createReceiverArray(this.numOutlets)
        this.inletDescriptions = ['audio input', 'gain value']
        this.outletDescriptions = ['audio output']
    }

    receiveData(inlet, data) {
        switch (inlet) {
            case 1:
                this.attributes.gain = parseFloat(data)
                this.audioNode.gain.value = this.attributes.gain
                return
            default: 
                throw(new Error('INVALID INLET'))

        }
    }

    updateAttributes(newAttributes) {
        if (newAttributes[1]) {
            this.attributes.gain = parseFloat(newAttributes[1])
            this.audioNode.gain.value = this.attributes.gain
        }
    }
}

export default SignalMultiplyObject