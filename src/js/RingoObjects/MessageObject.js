import NewQuaxObject, { Receiver, OutletInletPair } from './NewQuaxObject'
import OBJECT_TYPES from '../constants/object-types'

class MessageObject extends NewQuaxObject {
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

    sendData(data) {
        let dataToSend = this.data
        // if (this.wildCards.length > 0)
        //     dataToSend = this.subsituteWildCards()
        // for (let i in this.receivers[0]) {
        //     for (let inlet = 0; inlet < this.receivers[0][i].length; i++)
        //         this.processor.objects[i].receiveData(this.receivers[0][i][inlet], dataToSend)
        // }
        // iterate through receiver objects
        
        for (let i = 0; i < this.receivers.length; i++) {
            let currentID = this.receivers[i].id            
            // iterate through all outlet/inlet combinations
            for (let j = 0; j < this.receivers[i].outletInletPairs.length; j++) {
                let currentOutlet = this.receivers[i].outletInletPairs[j].outlet
                let currentInlet = this.receivers[i].outletInletPairs[j].inlet
                this.processor.objects[currentID].receiveData(currentInlet, dataToSend)
            }
            
        }
    }

    receiveData(inlet, data) {
        if (this.wildCards.length > 0) {
            if (inlet < this.wildCards.length) {
                this.wildCards[inlet] = data
                if (inlet === 0) this.sendData()
            }
            else {
                this.data = data
            }
        }
        else {
            switch (inlet) {
                case 0:
                    this.sendData(0)
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

    update(text) {
        this.data = text
        this.wildCards = new Array((text.match(/\$/g) || []).length)
        if (this.wildCards.length > 0) {
            this.numInlets = this.wildCards.length + 1
            this.callback(this.data)
        }
    }

    addReceiver(outletIndex, inletIndex, inputID) {
        let newPair = new OutletInletPair(outletIndex, inletIndex)
        let alreadyPresent = false
        for (let i = 0; i < this.receivers.length; i++) {
            if (this.receivers[i].id === inputID) {
                this.receivers[i].outletInletPairs.push(newPair)
                alreadyPresent = true
            }
        }

        if (!alreadyPresent) this.receivers.push(new Receiver(inputID, newPair))
        
        // this.receivers[outletIndex][inputID] = [...this.receivers[outletIndex][inputID], inletIndex]
    }

}

export default MessageObject