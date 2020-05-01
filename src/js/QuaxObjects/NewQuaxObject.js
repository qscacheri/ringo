class NewQuaxObject {
    constructor(processor) {
        this.processor = processor
        this.numInlets = 1
        this.numOutlets = 1
        this.receivers = {}
        this.attributes = {}
        this.position = {x: 0, y: 0}
        this.type = 'EMPTY'
    }

    updateAttributes(attributeName, value) {

    }

    addReceiver(receiverID) {
        // this.receivers[receiverID]
    }

    sendData() {

    }

    receiveData(data) {

    }
}

export default NewQuaxObject