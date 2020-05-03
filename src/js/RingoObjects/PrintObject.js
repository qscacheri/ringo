import NewQuaxObject from './NewQuaxObject'

class PrintObject extends NewQuaxObject {
    constructor(processor) {
        super(processor)
        this.numInlets = 1
        this.numOutlets = 0
        this.type = 'PRINT'
    }

    receiveData(inlet, data) {
        console.log(data)
    }
}

export default PrintObject