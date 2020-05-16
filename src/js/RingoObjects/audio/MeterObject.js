import RingoObject from '../base/RingoObject'
import OBJECT_TYPES from '../../constants/object-types'
import { Meter } from 'tone'

class MeterObject extends RingoObject {
    constructor(processor, position) {
        super(processor, position)
        this.numInlets = 2
        this.numOutlets = 1
        this.type = OBJECT_TYPES.METER
        this.audioNode = new Meter()
        setInterval(() => this.sendData(this.audioNode.getLevel()), 1)
        this.hasDSP = true
        this.sendData = this.sendData.bind(this)
        this.inletDescriptions = ['audio input', 'poll rate in ms']
        this.outletDescriptions = ['audio signal level']

    }
}

export default MeterObject