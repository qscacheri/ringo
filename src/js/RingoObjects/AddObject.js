import NewQuaxObject from './NewQuaxObject'
import OBJECT_TYPES from '../constants/object-types'

class AddObject extends NewQuaxObject {
    constructor(processor) {
        super(processor)
        this.numInlets = 2
        this.numOutlets = 1
        this.attributes = {
            num1: 0,
            num2: 0,
            store: 0,
        }
        this.storedVal = 0
        this.type = OBJECT_TYPES.ADD
    }

    receiveData(inlet, data) {
        switch (inlet) {
            case 0:
                const newNum = parseFloat(data)
                if (!isNaN(newNum) && !this.attributes.store)
                    this.attributes.num1 = parseFloat(data)
                const sum = this.attributes.num1 + this.attributes.num2
                this.sendData(sum)
                if (this.attributes.store === 1) this.attributes.num1 = sum
                return;
            case 1: 
                this.attributes.num2 = parseFloat(data) 
                return
        }
    }

    updateAttributes(newAttributes) {
        if (newAttributes[1]) this.attributes.num2 = parseFloat(newAttributes[1])
        if (newAttributes[2]) this.attributes.store = parseInt(newAttributes[2])
    }
    
}

export default AddObject