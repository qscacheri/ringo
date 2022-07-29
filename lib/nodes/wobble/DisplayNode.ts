import * as THREE from 'three';
import { RingoNodeAttributeList } from '../../RingoNodeAttributeList';
import { Terminal } from '../../Terminal';
import { RingoAttributeType, RingoNodeType } from '../../types';
import { RingoNode, RingoNodeConstructorArgs } from "../core/RingoNode";
import { RingoWobbleNode } from "./RingoWobbleNode";

export class DisplayNode extends RingoWobbleNode {
    container?: HTMLElement
    renderer!: THREE.WebGLRenderer
    scene!: THREE.Scene
    camera!: THREE.PerspectiveCamera


    setContainer(container: HTMLElement): void {
        this.container = container;
        const { width, height } = container.getBoundingClientRect();
        this.renderer.setSize(width, height);

        this.container.appendChild(this.renderer.domElement);
        this.animate();
    }

    animate() {
        requestAnimationFrame(this.animate);
        this.renderer.render(this.scene, this.camera);
    }

    init(args: RingoNodeConstructorArgs): void {
        super.init(args)
        this.renderer = new THREE.WebGLRenderer({ antialias: true });
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(70, 1, 0.01, 10);
        this.camera.position.z = 1;
        this.animate = this.animate.bind(this);

    }


    getInletLayout(): Terminal[] {
        return [{ name: "input", type: 'graphics' }]
    }

    getOutletLayout(): Terminal[] {
        return []
    }

    getInitialAttributes(): RingoNodeAttributeList {
        return new RingoNodeAttributeList([
            { name: 'clearColor', type: RingoAttributeType.string, value: '#000000' },
        ])
    }

    onAttributeChange(key: string, value: unknown): void {
        switch (key) {
            case 'clearColor':
                this.renderer.setClearColor(value as string);
        }
    }

    getType(): RingoNodeType {
        return 'display'
    }

    static isDisplayNode(node: RingoNode): node is DisplayNode {
        return node.getType() === 'display'
    }
}