import NewQuaxObject from './NewQuaxObject'
import OBJECT_TYPES from '../constants/object-types'

class SliderObject extends NewQuaxObject {
    constructor(processor) {
        super(processor)
        this.numInlets = 4
        this.numOutlets = 1
        this.attributes = {
            min: 0,
            max: 1,
            step: .01,
            currentValue: .5
        }
        this.type = OBJECT_TYPES.SLIDER
        this.receivers = this.createReceiverArray(this.numOutlets)
    }

    sendData() {
        for (let i in this.receivers[0]) {
            this.processor.objects[i].receiveData(this.receivers[0][i], this.attributes.currentValue)
        }
    }

    receiveData(inlet, data) {
        switch (inlet) {
            case 0:
                if (typeof (data) === 'number')
                    this.attributes.currentValue = data
                this.sendData(this.attributes.currentValue)
                return;
            case 1:
                this.attributes.min = data
                return
            case 2:
                this.attributes.max = data
                return
            case 3:
                this.attributes.step = data
                return
        }
    }

    setCurrentValue(newValue) {
        this.attributes.currentValue = newValue
    }

    updateAttributes(newAttributes) {
        if (newAttributes[1]) this.attributes.min = parseFloat(newAttributes[1])
        if (newAttributes[2]) this.attributes.max = parseFloat(newAttributes[2])
        if (newAttributes[3]) this.attributes.step = parseFloat(newAttributes[3])
    }

    addReceiver(outletIndex, inletIndex, inputID) {
        this.receivers[outletIndex][inputID] = inletIndex
    }

}

export default SliderObject