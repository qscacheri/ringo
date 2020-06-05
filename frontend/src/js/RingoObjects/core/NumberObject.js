import RingoObject from '../base/RingoObject'
import OBJECT_TYPES from '../../constants/object-types'
class NumberObject extends RingoObject {
    static type = OBJECT_TYPES.NUMBER

    constructor(id, processor, position, attributes) {
        super(id, processor, position, attributes)
        this.numInlets = 2
        this.numOutlets = 1
        this.attributes = {
            value: 0
        }
        this.inletDescriptions = ['trigger', 'set number value']
        this.outletDescriptions = ['number value']

    }

    receiveData(inlet, data) {
        switch (inlet) {
            case 0:
                this.sendData(this.attributes.value)
                return;
            case 1:
                this.attributes.value = parseFloat(data)
                return
            default: 
                throw(new Error('INVALID INLET'))
        }
    }

    updateAttributes(newAttributes) {
        if (newAttributes[1]) this.attributes.value = parseFloat(newAttributes[1])
    }
}

export default NumberObject