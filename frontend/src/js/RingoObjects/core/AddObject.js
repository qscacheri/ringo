import RingoObject from '../base/RingoObject'
import OBJECT_TYPES from '../../constants/object-types'
class AddObject extends RingoObject {
    constructor(processor, position) {
        super(processor, position)
        this.numInlets = 2
        this.numOutlets = 1
        this.attributes = {
            num1: 0,
            num2: 0,
            store: 0,
        }
        this.storedVal = 0
        this.type = OBJECT_TYPES.ADD
        this.inletDescriptions = ['number 1', 'number 2']
        this.outletDescriptions = ['sum of both numbers or running sum if attribute set']
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
            default: 
                throw(new Error('INVALID INLET'))
        }
    }

    updateAttributes(newAttributes) {
        if (newAttributes[1]) this.attributes.num2 = parseFloat(newAttributes[1])
        if (newAttributes[2]) this.attributes.store = parseInt(newAttributes[2], 10)
    }
    
}

export default AddObject