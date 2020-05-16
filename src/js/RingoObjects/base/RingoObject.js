class RingoObject {
    constructor(processor) {
        this.processor = processor
        this.numInlets = 1
        this.numOutlets = 1
        this.receivers = []
        this.attributes = {}
        this.position = { x: 0, y: 0 }
        this.type = 'EMPTY'
        this.hasDSP = false
        this.outletDescriptions = []
        this.inletDescriptions = []
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
        const receivers = []
        this.receivers.map(receiver => {
            receivers.push(receiver.toJSON())
        })

        return {
            type: this.type, 
            receivers,
            text: this.attributes,
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
        this.toJSON = () => {
            return {
                outlet: this.outlet,
                inlet: this.inlet
            }
        }
    }
}

export const Receiver = function (id, outletInletPair) {
    this.id = id
    this.outletInletPairs = []
    this.outletInletPairs.push(outletInletPair)

    this.toJSON = () => {
        const pairs = []
        this.outletInletPairs.map(pair => {
            pairs.push(pair.toJSON())
        })
    }
}

export default RingoObject