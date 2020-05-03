import NewQuaxObject from './NewQuaxObject'
import OBJECT_TYPES from '../constants/object-types'
import * as THREE from "three";
import ProcessorTree from '../utils/ProcessorTree';

class ThreeShapeObject extends NewQuaxObject {
    constructor(processor) {
        super(processor)
        this.numInlets = 3
        this.numOutlets = 1
        this.type = OBJECT_TYPES.THREE
        this.hasDSP = true
        this.receivers = this.createReceiverArray(this.numOutlets)
        const geometry = new THREE.BoxGeometry( 1, 1, 1 );
        const material = new THREE.MeshBasicMaterial( { color: 0xffffff } );
        this.shape = new THREE.Mesh( geometry, material );
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

    sendData() {
        for (let i in this.receivers[0]) {
            const randVal = this.attributes.min + Math.random() * (this.attributes.min + this.attributes.max)
            this.processor.objects[i].receiveData(this.receivers[0][i], randVal)
        }        
    }

    receiveData(inlet, data) {
        debugger
        switch(inlet) {
            case 0:
                const pos = data.split(' ')
                this.shape.position.x = parseFloat(pos[0])
                this.shape.position.y = parseFloat(pos[1])
                this.shape.position.z = parseFloat(pos[2])
                return
        }
    }

    addReceiver(outletIndex, inletIndex, inputID) {
        super.addReceiver(outletIndex, inletIndex, inputID)
        ProcessorTree.objects[inputID].addShape(this.shape)
    }
    
}

export default ThreeShapeObject