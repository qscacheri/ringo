import OBJECT_TYPES from '../../constants/object-types'
import { Oscillator } from 'tone'
import RingoAudioObject from '../base/RingoAudioObject'

class OscillatorObject extends RingoAudioObject {
    static type = OBJECT_TYPES.OSC

    constructor(processor, position, attributes) {
        super(processor, position, attributes)
        this.numInlets = 3
        this.numOutlets = 1
        this.attributes = {
            frequency: 220,
            type: 'sine'
        }
        this.audioNode = new Oscillator()
        this.audioNode.start()
        this.inletDescriptions = ['audio input', 'frequency value']
        this.outletDescriptions = ['audio output']

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
                if (typeof (data) !== 'number') return
                this.attributes.frequency = data
                this.audioNode.frequency.value = this.attributes.frequency
                return
            case 2:
                this.attributes.type = data
                this.audioNode.type = this.attributes.type
                return
            default: 
                throw(new Error('INVALID INLET'))

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
    connect(outletIndex, inletIndex, inputID) {
        super.connect(outletIndex, inletIndex, inputID)
        this.audioNode.start()
    }
}

export default OscillatorObject