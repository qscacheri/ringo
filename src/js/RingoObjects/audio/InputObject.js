import RingoAudioObject from '../base/RingoAudioObject'
import OBJECT_TYPES from '../../constants/object-types'
import { UserMedia } from 'tone'

class InputObject extends RingoAudioObject {
    constructor(processor) {
        super(processor)
        this.numInlets = 1
        this.numOutlets = 1
        this.attributes = {
            open: true,
        }
        this.type = OBJECT_TYPES.INPUT
        this.audioNode = new UserMedia()
        this.audioNode.open()
        this.receivers = this.createReceiverArray(this.numOutlets)
    }
    
    receiveData(inlet, data) {
        switch (inlet) {
            default: 
                return
        }
    }

    updateAttributes(newAttributes) {                
    }

}

export default InputObject