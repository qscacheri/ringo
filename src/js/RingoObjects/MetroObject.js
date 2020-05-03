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
        this.sendData = this.sendData.bind(this)
        this.metroFunction = setInterval(() => {
            this.sendData('BANG')
        }, this.attributes.rate)
    }

    receiveData(inlet, data) {
        // TODO - implement rate change when receiving data
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
}

export default Metro