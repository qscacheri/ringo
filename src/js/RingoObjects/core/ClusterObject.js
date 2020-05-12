import RingoObject from '../base/RingoObject'
import OBJECT_TYPES from '../../constants/object-types'
import createObject from '../../utils/object-creators'
class ClusterObject extends RingoObject {
    constructor(processor) {
        super(processor)
        this.numInlets = 3
        this.numOutlets = 1
        this.attributes = {
            size: 10,
        }
        this.storedVal = 0
        this.type = OBJECT_TYPES.CLUSTER
        this.clusterType = ''
        this.cluster = []
    }

    receiveData(inlet, data) {
        switch (inlet) {
            case 0:
                this.sendData('some data')
            case 1:
                if (parseFloat(data))
                    this.attributes.size = parseFloat(data)
                else
                    this.clusterType = data.toUpperCase()
            case 2:
                this.processData(data)
                return
        }
    }

    processData(data) {
        const splitData = data.split(' ')
        const index = parseFloat(splitData[0])
        const object = this.cluster[index]
        splitData.shift()
        const inlet = parseFloat(splitData[0])
        splitData.shift()
        object.receiveData(inlet, splitData.join(' '))
    }

    addReceiver(outletIndex, inletIndex, inputID) {
        // super.addReceiver(outletIndex, inletIndex, inputID)
        for (let i = 0; i < this.attributes.size; i++) {
            this.cluster[i].addReceiver(outletIndex, inletIndex, inputID)
        }
    }


    updateAttributes(newAttributes) {
        if (newAttributes[1]) this.attributes.size = parseFloat(newAttributes[1])
        if (newAttributes[2]) {
            this.clusterType = newAttributes[2].toUpperCase()
            console.log(this.clusterType);
            
            for (let i = 0; i < this.attributes.size; i++) {
                this.cluster[i] = createObject(this.processor, this.clusterType)
            }
        }

    }

}

export default ClusterObject