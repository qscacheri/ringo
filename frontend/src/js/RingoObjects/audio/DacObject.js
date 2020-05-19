import OBJECT_TYPES from '../../constants/object-types'
import { Gain } from 'tone'
import RingoAudioObject from '../base/RingoAudioObject'

class DacObject extends RingoAudioObject {
    static type = OBJECT_TYPES.DAC

    constructor(processor, position) {
        super(processor, position)
        this.numInlets = 1
        this.numOutlets = 0
        this.audioNode = new Gain()
        this.audioNode.toMaster()
        this.hasDSP = true
        this.inletDescriptions = ['audio input']
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
}

export default DacObject