import NewQuaxObject from './NewQuaxObject'
import OBJECT_TYPES from '../constants/object-types'

class ScaleObject extends NewQuaxObject {
    constructor(processor) {
        super(processor)
        this.numInlets = 5
        this.numOutlets = 1
        this.attributes = {
            inputMin: 0,
            inputMax: 1,
            inputMin: 0,
            inputMax: 1
        }
        this.type = OBJECT_TYPES.SCALE
        this.hasDSP = true
    }

    scaleValue(input, inputMin, inputMax, outputMin, outputMax) {
        const scaledVal = ((input - inputMin) / (inputMax - inputMin)) * (outputMax - outputMin) + outputMin;
        debugger
        this.sendData(scaledVal)

    }

    receiveData(inlet, data) {
        switch (inlet) {
            case 0:
                this.scaleValue(data, this.attributes.inputMin, this.attributes.inputMax, this.attributes.outputMin, this.attributes.outputMax)
                return;
            case 1:
                this.attributes.inputMin = parseFloat(data)
                return
            case 2:
                this.attributes.inputMax = parseFloat(data)
                return
            case 3:
                this.attributes.outputMin = parseFloat(data)
                return
            case 4:
                this.attributes.outputMax = parseFloat(data)
                return
        }
    }

    updateAttributes(newAttributes) {
        if (newAttributes[1]) this.attributes.inputMin = parseFloat(newAttributes[1])
        if (newAttributes[2]) this.attributes.inputMax = parseFloat(newAttributes[2])
        if (newAttributes[3]) this.attributes.outputMin = parseFloat(newAttributes[3])
        if (newAttributes[4]) this.attributes.outputMax = parseFloat(newAttributes[4])
    }
}

export default ScaleObject