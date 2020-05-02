class NewQuaxObject {
    constructor(processor) {
        this.processor = processor
        this.numInlets = 1
        this.numOutlets = 1
        this.receivers = []
        this.attributes = {}
        this.position = {x: 0, y: 0}
        this.type = 'EMPTY'
        this.hasDSP = false
    }

    updateAttributes(attributeName, value) {

    }

    addReceiver(outletIndex, inletIndex, inputID) {
        this.receivers[outletIndex][inputID] = inletIndex
    }

    sendData() {

    }

    receiveData(inlet, data) {
        
    }

    createReceiverArray(numOutlets) {
        const array = new Array(numOutlets)
        for (let i = 0; i < numOutlets; i++) array[i] = {}
        return array
    }
}

export default NewQuaxObject