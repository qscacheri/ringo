import OBJECT_TYPES from '../../constants/object-types'
import { Gain } from 'tone'
import RingoAudioObject from '../base/RingoAudioObject'

class DacObject extends RingoAudioObject {
    constructor(processor) {
        super(processor)
        this.numInlets = 1
        this.numOutlets = 0
        this.type = OBJECT_TYPES.DAC
        this.audioNode = new Gain()
        this.audioNode.toMaster()
        this.hasDSP = true
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