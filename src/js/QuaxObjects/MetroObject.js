import NewQuaxObject from './NewQuaxObject'
import OBJECT_TYPES from '../constants/object-types'

class Metro extends NewQuaxObject {
    constructor(processor) {
        super(processor)
        this.numInlets = 2
        this.numOutlets = 1
        this.attributes = {
            start: true,
            rate: 1000
        }
        this.type = OBJECT_TYPES.NUMBER
        this.receivers = this.createReceiverArray(this.numOutlets)
        this.metroFunction = setInterval(() => {
            this.sendData('BANG', this)
        }, this.attributes.rate)
    }

    sendData(data, self) {
        if (!self.attributes.start) return
        for (let i in this.receivers[0]) {
            self.processor.objects[i].receiveData(self.receivers[0][i], data)
        }
    }

    receiveData(inlet, data) {
        switch (inlet) {
            case 0:
                this.attributes.start = true
                return;
            case 1:
                this.attributes.rate = data
                return
        }
    }

    updateAttributes(newAttributes) {
        if (newAttributes[1]) {
            this.attributes.rate = parseFloat(newAttributes[1])
            clearInterval(this.metroFunction)
            this.metroFunction = setInterval(() => {
                this.sendData('BANG', this)
            }, this.attributes.rate)
        }
    }

    addReceiver(outletIndex, inletIndex, inputID) {
        this.receivers[outletIndex][inputID] = inletIndex
    }
}

export default Metro