import RingoObject from '../base/RingoObject'
import OBJECT_TYPES from '../../constants/object-types'
class ButtonObject extends RingoObject {

    static type = OBJECT_TYPES.BUTTON
    static objectDescription = "Click to trigger a bang"
    static inletDescriptions = ['trigger button press']
    static outletDescriptions = ['bang']

    constructor(processor, position, attributes) {
        super(processor, position, attributes)
        this.numInlets = 1
        this.numOutlets = 1
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