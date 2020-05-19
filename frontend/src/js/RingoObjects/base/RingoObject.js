class RingoObject {
    static objectDescription = ""
    static type = 'EMPTY'

    constructor(processor, position) {
        this.processor = processor
        this.numInlets = 0
        this.numOutlets = 0
        this.receivers = []
        this.attributes = {}
        this.position = { x: 0, y: 0 }
        this.hasDSP = false
        this.outletDescriptions = []
        this.inletDescriptions = []
        this.text = ""
        this.position = position        
    }

    updateAttributes(attributeName, value) {

    }

    connect(outletIndex, inletIndex, inputID) {
        let newPair = new OutletInletPair(outletIndex, inletIndex)
        let alreadyPresent = false
        for (let i = 0; i < this.receivers.length; i++) {
            if (this.receivers[i].id === inputID) {
                this.receivers[i].outletInletPairs.push(newPair)
                alreadyPresent = true
            }
        }

        if (!alreadyPresent) this.receivers.push(new Receiver(inputID, newPair))
    }

    sendData(data) {
        for (let i = 0; i < this.receivers.length; i++) {
            let currentID = this.receivers[i].id
            if (!this.processor.objects[currentID]) {
                this.receivers.splice(i, 1)
                continue;
            }   
            
            // iterate through all outlet/inlet combinations
            for (let j = 0; j < this.receivers[i].outletInletPairs.length; j++) {
                let currentOutlet = this.receivers[i].outletInletPairs[j].outlet
                let currentInlet = this.receivers[i].outletInletPairs[j].inlet
                this.processor.objects[currentID].receiveData(currentInlet, data)
            }

        }
    }

    receiveData(inlet, data) {

    }

    createReceiverArray(numOutlets) {
        const array = new Array(numOutlets)
        for (let i = 0; i < numOutlets; i++) array[i] = {}
        return array
    }

    toJSON() {
        console.log(this.position);
        
        const receivers = []
        this.receivers.map(receiver => {
            receivers.push(receiver.toJSON())
        })

        return {
            type: this.type, 
            receivers,
            text: this.text,
            position: this.position
        }
    }

    isOutletConnectedTo(id) {
        
        // connected to outlet
        for (let i = 0; i < this.receivers.length; i++) {            
            if (id == this.receivers[i].id) return true
        }
        return false
    }

    getIOLetDescription(type, index) {
        if (type === 'OUT')
            return this.outletDescriptions[index]
        else 
            return this.inletDescriptions[index]
    }
}

export class OutletInletPair {
    constructor(outlet, inlet) {
        this.outlet = outlet
        this.inlet = inlet
    }

    toJSON() {
        return {
            outlet: this.outlet,
            inlet: this.inlet
        }
    }

}

export class Receiver {
    constructor(id, outletInletPair) {     
        this.outletInletPairs = []
  
        if (id.id) {
            this.fromJSON(id) // actually the json since no multiple constructors
        }

        else {
            this.id = id
            this.outletInletPairs.push(outletInletPair)    
        }  
    }

    toJSON () {
        const pairs = []
        this.outletInletPairs.map(pair => {
            pairs.push(pair.toJSON())
        })
        return {
            id: this.id,
            pairs
        }
    }

    fromJSON (receiver) {
        this.id = receiver.id
        receiver.pairs.map(pair => {
            this.outletInletPairs.push(new OutletInletPair(pair.outlet, pair.inlet))
        })
    }
}

export default RingoObject