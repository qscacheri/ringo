import RingoObject from '../base/RingoObject'
import OBJECT_TYPES from '../../constants/object-types'
class SliderObject extends RingoObject {
    static type = OBJECT_TYPES.SLIDER
    
    constructor(id, processor, position, attributes) {
        super(id, processor, position, attributes)
        this.numInlets = 2
        this.numOutlets = 1
        this.inletDescriptions = ['trigger send', 'set value']
        this.outletDescriptions = ['value']
        this.value = .5
    }

    receiveData(inlet, data) {
        switch (inlet) {
            case 0:
                this.sendData(this.value)
                return
            case 1:
                if (parseFloat(data)) this.value = data
                return
            default: 
                throw(new Error('INVALID INLET'))
        }
    }

    updateSliderValue(newValue) {
        console.log(newValue);
        
        this.value = newValue
        this.sendData(this.value)
    }
}

export default SliderObject