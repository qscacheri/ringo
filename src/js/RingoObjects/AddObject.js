import NewQuaxObject from './NewQuaxObject'
import OBJECT_TYPES from '../constants/object-types'

class AddObject extends NewQuaxObject {
    constructor(processor) {
        super(processor)
        this.numInlets = 2
        this.numOutlets = 1
        this.attributes = {
            num1: 0,
            num2: 0
        }
        this.type = OBJECT_TYPES.PLUS
    }

    receiveData(inlet, data) {
        switch (inlet) {
            case 0:
                this.attributes.num1 = parseFloat(data)
                this.sendData(this.attributes.num1 + this.attributes.num2)
                return;
            case 1: 
                this.attributes.num2 = parseFloat(data)
                return
        }
    }

    updateAttributes(newAttributes) {
        if (newAttributes[1]) this.attributes.num2 = parseFloat(newAttributes[1])
    }
    
}

export default AddObject