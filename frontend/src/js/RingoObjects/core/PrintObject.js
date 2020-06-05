import RingoObject from '../base/RingoObject'

class PrintObject extends RingoObject {
    static type = 'PRINT'

    constructor(id, processor, position, attributes) {
        super(id, processor, position, attributes)
        this.numInlets = 1
        this.numOutlets = 0
    }

    receiveData(inlet, data) {
        console.log(data)
    }
}

export default PrintObject