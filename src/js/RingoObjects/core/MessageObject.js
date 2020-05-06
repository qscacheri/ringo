import RingoObject, { Receiver, OutletInletPair } from '../base/RingoObject'
import OBJECT_TYPES from '../../constants/object-types'
class MessageObject extends RingoObject {
    constructor(processor) {
        super(processor)
        this.numInlets = 2
        this.numOutlets = 1
        this.type = OBJECT_TYPES.MESSAGE
        this.receivers = this.createReceiverArray(this.numOutlets)
        this.callback = null
        this.wildCards = []
        this.data = ''
        this.receivers = []
    }

    receiveData(inlet, data) {
        console.log(data);
        
        if (this.wildCards.length > 0) {
            if (inlet < this.wildCards.length) {
                this.wildCards[inlet] = data
                if (inlet === 0) this.sendData(this.subsituteWildCards())
            }
            else {
                this.data = data
            }
        }
        else {
            switch (inlet) {
                case 0:
                    this.sendData(this.data)
                    return;
                case 1:
                    this.data = data
                    this.callback(data)
                    return
            }
        }
    }

    subsituteWildCards() {
        let wildCardText = this.data
        for (let i = 1; i <= this.wildCards.length; i++) {
            let wildCard = '$'+ i
            console.log(wildCard);
            
            wildCardText = wildCardText.replace(wildCard, this.wildCards[i - 1])    
        }
        // debugger
        console.log(wildCardText);
        
        return wildCardText

    }

    triggerMessage() {
        this.sendData(this.data)
    }

    update(text) {
        this.data = text
        this.wildCards = new Array((text.match(/\$/g) || []).length)
        if (this.wildCards.length > 0) {
            this.numInlets = this.wildCards.length + 1
            this.callback(this.data)
        }
    }
}

export default MessageObject