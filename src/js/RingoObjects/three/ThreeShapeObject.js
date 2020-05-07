import RingoObject from '../base/RingoObject'
import OBJECT_TYPES from '../../constants/object-types'
import * as THREE from "three";
import ProcessorTree from '../../utils/ProcessorTree';

class ThreeShapeObject extends RingoObject {
    constructor(processor) {
        super(processor)
        this.numInlets = 3
        this.numOutlets = 1
        this.type = OBJECT_TYPES.THREE
        this.hasDSP = true
        this.receivers = this.createReceiverArray(this.numOutlets)
        const geometry = new THREE.BoxGeometry(1, 1, 1);
        const material = new THREE.MeshBasicMaterial({ color: 0xffffff });
        this.shape = new THREE.Mesh(geometry, material);

        this.attributes = {
            type: 'cube',
            size: {
                width: 10,
                height: 10,
                depth: 10
            },
            position: {
                x: 0,
                y: 0,
                z: 0
            },
            color: ''
        }
    }

    receiveData(inlet, data) {
        debugger
        switch (inlet) {
            case 0:
                this.parseData(data, 'position')
                return
            case 1:
                this.parseData(data, 'rotation')
                return

        }
    }

    addReceiver(outletIndex, inletIndex, inputID) {
        super.addReceiver(outletIndex, inletIndex, inputID)
        ProcessorTree.objects[inputID].addShape(this.shape)
    }

    parseData(data, shapeAttribute) {
        if (typeof (data) === 'number') {
            if (shapeAttribute == 'position') {
                this.shape.position.x = data
                return
            }

            if (shapeAttribute == 'rotation') {
                this.shape.rotation.x = data
                return
            }
        }
        else {
            const splitData = data.split(' ')
            const x = splitData[0] ? parseFloat(splitData[0]) : null
            const y = splitData[1] ? parseFloat(splitData[1]) : null
            const z = splitData[2] ? parseFloat(splitData[2]) : null

            if (shapeAttribute == 'position') {
                if (!isNaN(x)) this.shape.position.x = x
                if (!isNaN(y)) this.shape.position.y = y
                if (!isNaN(z)) this.shape.position.z = z
                console.log(x, y, z);

                return
            }

            if (shapeAttribute == 'rotation') {
                if (!isNaN(x) && x) this.shape.rotation.x = x
                if (!isNaN(y) && y) this.shape.rotation.y = y
                if (!isNaN(z) && z) this.shape.rotation.z = z
                // console.log(x, y, z);
                console.log(this.shape.rotation.x)
                return
            }
        }
    }

}

export default ThreeShapeObject