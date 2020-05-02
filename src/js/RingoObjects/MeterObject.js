import NewQuaxObject from './NewQuaxObject'
import OBJECT_TYPES from '../constants/object-types'
import { Meter } from 'tone'

class MeterObject extends NewQuaxObject {
    constructor(processor) {
        super(processor)
        this.numInlets = 2
        this.numOutlets = 1
        this.type = OBJECT_TYPES.METER
        this.audioNode = new Meter()
        setInterval(() => this.sendData(this), 1)
        this.receivers = this.createReceiverArray(this.numOutlets)
        this.hasDSP = true

    }

    sendData(self) {
        for (let i in this.receivers[0]) {
            const level = self.audioNode.getLevel()
            this.processor.objects[i].receiveData(this.receivers[0][i], level)
        }        
    }

    receiveData(inlet, data) {
        
    }

    addReceiver(outletIndex, inletIndex, inputID) {
        this.receivers[outletIndex][inputID] = inletIndex
        console.log(this.receivers);
        
    }
}

export default MeterObject