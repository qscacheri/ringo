import { action, makeAutoObservable, observable } from 'mobx';
import { RingoNode, SerializedRingoNode } from '../lib/nodes/core/RingoNode';
import { RingoNodeFactory } from '../lib/RingoNodeFactory';
import { ConsoleMessage, RingoNodeType } from '../lib/types';

export interface SerializedGraph {
    nodes: Record<string, SerializedRingoNode>;
}
export class GraphManager {
    constructor() {
        makeAutoObservable(this);
    }
    nodes: Map<string, RingoNode> = observable.map(new Map<string, RingoNode>());

    messages: ConsoleMessage[] = [];

    createNode(type: RingoNodeType) {
        const newNode = RingoNodeFactory.createNode(type, { graphManager: this });

        this.nodes = this.nodes.set(newNode.id, newNode);

        return newNode;
    }

    @action
    removeNode(node: RingoNode) {
        this.nodes.delete(node.id);
    }

    getNode(id: string): RingoNode {
        const node = this.nodes.get(id);
        if (!node) {
            throw new Error(`Node with id ${id} not found`);
        }
        return node;
    }

    setNodeAttribute(node: RingoNode, attribute: string, value: unknown) {
        node.setAttribute(attribute, value);
    }

    addMessage(message: string) {
        this.messages = [
            ...this.messages,
            { message, type: 'log', timestamp: new Date() },
        ];
    }

    serialize() {
        return Array.from(this.nodes).reduce((prev, [id, conn]) => {
            return { ...prev, nodes: { ...prev.nodes, [id]: conn.serialize() } };
        }, {} as any)
    }

    deserialize(input: SerializedGraph) {
        Object.entries(input.nodes).forEach(([id, node]) => {
            const deserialized = RingoNodeFactory.deserialize(this, node)
            this.nodes = this.nodes.set(id, deserialized);
        })
        this.nodes.forEach((node) => {
            node.reconnect();
        })

    }

    connectNodes(
        outNode: RingoNode,
        outlet: number,
        inNode: RingoNode,
        inlet: number
    ) {
        outNode.connect(outlet, inNode, inlet);
        return true;
    }
}

