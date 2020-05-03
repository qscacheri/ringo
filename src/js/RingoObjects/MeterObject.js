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
        setInterval(() => this.sendData(this.audioNode.getLevel()), 1)
        this.hasDSP = true
        this.sendData = this.sendData.bind(this)
    }
}

export default MeterObject