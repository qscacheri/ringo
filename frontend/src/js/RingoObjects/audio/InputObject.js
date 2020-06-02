import RingoAudioObject from '../base/RingoAudioObject'
import OBJECT_TYPES from '../../constants/object-types'
import { UserMedia } from 'tone'

class InputObject extends RingoAudioObject {
    static type = OBJECT_TYPES.INPUT

    constructor(processor, position, attributes) {
        super(processor, position, attributes)
        this.numInlets = 1
        this.numOutlets = 1
        this.attributes = {
            open: true,
        }
        this.audioNode = new UserMedia()
        this.audioNode.open()
        this.receivers = this.createReceiverArray(this.numOutlets)
        this.inletDescriptions = ['audio input', 'open / close']
        this.outletDescriptions = ['audio output']

    }
    
    receiveData(inlet, data) {
        switch (inlet) {
            default: 
                throw(new Error('INVALID INLET'))
        }
    }

    processData(data) {
        if (data === 'open')
            this.audioNode.open()
        else if (data === 'close')
            this.audioNode.close()
    }
}

export default InputObject