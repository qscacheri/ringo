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

class Receiver {
    constructor(id, outletInletPair) {     
        this.outletInletPairs = []
  
        if (id.id) {
            this.fromJSON(id) // actually the json since no multiple constructors
        }

        else {
            this.id = id
            this.outletInletPairs.push(outletInletPair)    
        }  
        this.toJSON = this.toJSON.bind(this)
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

export default Receiver