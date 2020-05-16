import RingoObject from '../base/RingoObject'
import OBJECT_TYPES from '../../constants/object-types'
class ButtonObject extends RingoObject {
    constructor(processor) {
        super(processor)
        this.numInlets = 1
        this.numOutlets = 1
        this.type = OBJECT_TYPES.BUTTON
        this.inletDescriptions = ['trigger button press']
        this.outletDescriptions = ['bang']
    }

    receiveData(inlet, data) {
        this.sendData('BANG')
    }

    updateAttributes(newAttributes) {
        if (newAttributes[1]) this.attributes.min = newAttributes[1]
        if (newAttributes[2]) this.attributes.max = newAttributes[2]
    }
}

export default ButtonObject