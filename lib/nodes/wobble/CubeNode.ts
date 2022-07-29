import * as THREE from 'three';
import { RingoNodeAttributeList } from '../../RingoNodeAttributeList';
import { Terminal } from '../../Terminal';
import { RingoAttributeType, RingoNodeType } from '../../types';
import { RingoNode, RingoNodeConstructorArgs } from '../core/RingoNode';
import { DisplayNode } from './DisplayNode';
import { RingoWobbleNode } from "./RingoWobbleNode";


export class CubeNode extends RingoWobbleNode {
    mesh!: THREE.Mesh;

    constructor(args: RingoNodeConstructorArgs) {
        super(args);

    }

    init(args: RingoNodeConstructorArgs): void {
        super.init(args);
        const geometry = new THREE.BoxGeometry(0.2, 0.2, 0.2);
        const material = new THREE.MeshNormalMaterial();
        this.mesh = new THREE.Mesh(geometry, material);
    }

    getInletLayout(): Terminal[] {
        return []
    }

    getOutletLayout(): Terminal[] {
        return [{ name: 'data', type: 'graphics' }]
    }

    getInitialAttributes(): RingoNodeAttributeList {
        return new RingoNodeAttributeList([
            { name: "posX", type: RingoAttributeType.number, value: 0 },
            { name: "posY", type: RingoAttributeType.number, value: 0 },
            { name: "posZ", type: RingoAttributeType.number, value: 0 },
            { name: "rotX", type: RingoAttributeType.number, value: 0 },
            { name: "rotY", type: RingoAttributeType.number, value: 0 },
            { name: "rotZ", type: RingoAttributeType.number, value: 0 },
        ])
    }

    onAttributeChange(key: string, value: unknown): void {
        switch (key) {
            case 'posX':
                this.mesh.position.x = value as number;
                break;
            case 'posY':
                this.mesh.position.y = value as number;
                break;
            case 'posZ':
                this.mesh.position.z = value as number;
                break;
            case 'rotX':
                this.mesh.rotation.x = value as number;
                break;
            case 'rotY':
                this.mesh.rotation.y = value as number;
                break;
            case 'rotZ':
                this.mesh.rotation.z = value as number;
                break;
        }
    }

    getType(): RingoNodeType {
        return 'cube'
    }

    onConnect(_: number, to: RingoNode, __: number): void {
        if (DisplayNode.isDisplayNode(to)) {
            to.scene.add(this.mesh);
        }
    }
}