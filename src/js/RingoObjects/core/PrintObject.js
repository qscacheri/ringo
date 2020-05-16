import RingoObject from '../base/RingoObject'

class PrintObject extends RingoObject {
    constructor(processor, position) {
        super(processor, position)
        this.numInlets = 1
        this.numOutlets = 0
        this.type = 'PRINT'
    }

    receiveData(inlet, data) {
        console.log(data)
    }
}

export default PrintObject