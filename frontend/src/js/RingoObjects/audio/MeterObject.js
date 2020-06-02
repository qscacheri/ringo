import RingoObject from '../base/RingoObject'
import OBJECT_TYPES from '../../constants/object-types'
import { Meter } from 'tone'

class MeterObject extends RingoObject {
    static type = OBJECT_TYPES.METER

    constructor(processor, position, attributes) {
        super(processor, position, attributes)
        this.numInlets = 2
        this.numOutlets = 1
        this.audioNode = new Meter()
        setInterval(() => this.sendData(this.audioNode.getLevel()), 1)
        this.hasDSP = true
        this.sendData = this.sendData.bind(this)
        this.inletDescriptions = ['audio input', 'poll rate in ms']
        this.outletDescriptions = ['audio signal level']

    }
}

export default MeterObject