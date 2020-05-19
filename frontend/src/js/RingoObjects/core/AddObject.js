import RingoObject from '../base/RingoObject'
import OBJECT_TYPES from '../../constants/object-types'
class AddObject extends RingoObject {
    
    static objectDescription = 
    "Outputs the sum of inlet 1 and inlet 2. \
    Optional First argument specifies number to add. \
    Optional second argument \ stores sum and creates running sum, ignores the number in inlet 1"
    static type = OBJECT_TYPES.ADD
    static inletDescriptions = ['number 1', 'number 2']
    static outletDescriptions = ['sum of both numbers or running sum if attribute set']

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