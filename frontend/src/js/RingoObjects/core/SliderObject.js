import RingoObject from '../base/RingoObject'
import OBJECT_TYPES from '../../constants/object-types'
class SliderObject extends RingoObject {
    constructor(processor, position) {
        super(processor, position)
        this.numInlets = 2
        this.numOutlets = 1
        this.type = OBJECT_TYPES.SLIDER
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
        }
    }

    updateSliderValue(newValue) {
        console.log(newValue);
        
        this.value = newValue
        this.sendData(this.value)
    }
}

export default SliderObject