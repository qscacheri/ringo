import NewQuaxObject from './NewQuaxObject'
import OBJECT_TYPES from '../constants/object-types'
import { Gain } from 'tone'

class DacObject extends NewQuaxObject {
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

    addReceiver(receiverID) {
        throw new Error('The DAC object should not have any receivers')
    }
}

export default DacObject