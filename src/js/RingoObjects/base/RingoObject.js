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

    isOutletConnectedTo(id) {
        
        // connected to outlet
        for (let i = 0; i < this.receivers.length; i++) {            
            if (id == this.receivers[i].id) return true
        }
        return false
    }
}

export const OutletInletPair = function (outlet, inlet) {
    this.outlet = outlet
    this.inlet = inlet
}


export const Receiver = function (id, outletInletPair) {
    this.id = id
    this.outletInletPairs = []
    this.outletInletPairs.push(outletInletPair)
}

export default RingoObject