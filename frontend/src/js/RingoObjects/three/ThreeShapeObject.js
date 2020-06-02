import RingoObject from '../base/RingoObject'
import OBJECT_TYPES from '../../constants/object-types'
import * as THREE from "three";
import ProcessorTree from '../../utils/ProcessorTree';

class ThreeShapeObject extends RingoObject {
    static type = OBJECT_TYPES.THREE_SHAPE

    constructor(processor, position, attributes) {
        super(processor, position, attributes)
        this.numInlets = 1
        this.numOutlets = 1
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
        this.outletDescriptions = ['shape output']
        this.inletDescriptions = ['set shape attributes']

    }

    receiveData(inlet, data) {
        this.parseMessage(data)
        return
        
    }

    connect(outletIndex, inletIndex, inputID) {
        super.connect(outletIndex, inletIndex, inputID)
        ProcessorTree.objects[inputID].addShape(this.shape)
    }

    parseMessage(data) {        
        let splitData = data.split(' ');
        
        if (splitData[0] === 'color') {
            const r = parseFloat(splitData[1]);
            const g = parseFloat(splitData[2]);
            const b = parseFloat(splitData[3]);
            this.shape.material.color.setRGB(r, g, b);
        }

        else if (splitData[0] === 'position') {
            const x = parseFloat(splitData[1]);
            const y = parseFloat(splitData[2]);
            const z = parseFloat(splitData[3]);
            this.shape.position.x = x;
            this.shape.position.y = y;
            this.shape.position.z = z;
        }

        else if (splitData[0] === 'rotation') {
            const x = parseFloat(splitData[1]);
            const y = parseFloat(splitData[2]);
            const z = parseFloat(splitData[3]);
            this.shape.rotation.x = x;
            this.shape.rotation.y = y;
            this.shape.rotation.z = z;
        }

        else if (splitData[0] === 'scale') {
            const x = parseFloat(splitData[1]);
            const y = parseFloat(splitData[2]);
            const z = parseFloat(splitData[3]);
            this.shape.scale.x = x;
            this.shape.scale.y = y;
            this.shape.scale.z = z;
        }
    }   

    parseData(data, shapeAttribute) {
        if (typeof (data) === 'number') {
            if (shapeAttribute === 'position') {
                this.shape.position.x = data
                return
            }

            if (shapeAttribute === 'rotation') {
                this.shape.rotation.x = data
                return
            }
        }
        else {
            const splitData = data.split(' ')
            const x = splitData[0] ? parseFloat(splitData[0]) : null
            const y = splitData[1] ? parseFloat(splitData[1]) : null
            const z = splitData[2] ? parseFloat(splitData[2]) : null

            if (shapeAttribute === 'position') {
                if (!isNaN(x)) this.shape.position.x = x
                if (!isNaN(y)) this.shape.position.y = y
                if (!isNaN(z)) this.shape.position.z = z
                return
            }

            if (shapeAttribute === 'rotation') {
                if (!isNaN(x) && x) this.shape.rotation.x = x
                if (!isNaN(y) && y) this.shape.rotation.y = y
                if (!isNaN(z) && z) this.shape.rotation.z = z
                return
            }
        }
    }

}

export default ThreeShapeObject