import { action, computed, observable } from 'mobx';
import { v4 as uuid } from 'uuid';
import { GraphManager } from '../../../stores/GraphManager';
import { RingoNodeAttributeList, SerializedNodeAttributeList } from '../../RingoNodeAttributeList';
import { Terminal } from '../../Terminal';
import { RingoAttributeType, RingoNodeType } from '../../types';
export type StaticThis<T> = { new(args: RingoNodeConstructorArgs): T };

export type DataType = 'any' | 'audio' | 'graphics';

export type RingoNodeConnection = {
    outlet: number;
    inlet: number;
    nodeId: string;
};

export interface RingoNodeAttribute {
    name: string;
    value: unknown;
    type: RingoAttributeType;
    options?: unknown[];
}

export type RingoNodeConstructorArgs = {
    id?: string;
    graphManager: GraphManager;
    attributes?: RingoNodeAttributeList;
    connections?: Record<string, RingoNodeConnection>;
};

export interface SerializedRingoNode {
    id: string;
    type: RingoNodeType;
    attributes: SerializedNodeAttributeList;
    connections: Record<string, RingoNodeConnection>;
}

export class RingoNode {
    id!: string;
    manager!: GraphManager;
    @observable attributes!: RingoNodeAttributeList;
    type!: RingoNodeType;

    @observable connections: Map<string, RingoNodeConnection> = new Map<
        string,
        RingoNodeConnection
    >();

    constructor(args: RingoNodeConstructorArgs) {
        this.init(args)
        const { attributes } = args;


        if (attributes) {
            attributes.attributes.forEach(((attr: RingoNodeAttribute) => {
                // this.setAttribute(attr.name, attr.value);
            }).bind(this))
        }
    }


    static create<T extends RingoNode>(
        this: StaticThis<T>,
        args: RingoNodeConstructorArgs
    ) {
        const that = new this(args);
        return that;
    }

    getType(): RingoNodeType {
        throw new Error('Method not implemented.');
    }

    getInletLayout(): Terminal[] {
        throw new Error('Method not implemented.');
    }
    getOutletLayout(): Terminal[] {
        throw new Error('Method not implemented.');
    }

    getInitialAttributes(): RingoNodeAttributeList {
        throw new Error('Method not implemented.');
    }

    @action
    receive(inlet: number, data: unknown): void {
        throw new Error('Method not implemented.');
    }

    @computed
    getAttributes() {
        return this.attributes;
    }

    init(args: RingoNodeConstructorArgs) {
        const { id, graphManager, connections } = args;

        this.manager = graphManager;
        this.attributes = this.getInitialAttributes();


        this.type = this.getType();
        if (connections) {
            this.connections = new Map(Object.entries(connections));
        }
        console.log("connections", this.connections);

        if (id) {
            this.id = id;
        } else {
            this.id = uuid();
        }
    }

    getAttribute(key: string): RingoNodeAttribute {
        return this.attributes.get(key);
    }

    getDataForOutlet(outlet: number, data?: unknown): unknown {
        throw new Error('Method not implemented.');
    }

    onAttributeChange(key: string, value: unknown) { }

    @action
    setAttribute(name: string, value: unknown) {
        this.attributes.set(name, value);
        this.onAttributeChange(name, value);
    }

    send(outlet: number, data?: unknown) {
        Array.from(this.connections).forEach(([id, conn]) => {
            if (conn.outlet !== outlet) return;
            const receivingNode = this.manager.getNode(id);
            console.log("data for outlet", this.getDataForOutlet(outlet, data));

            receivingNode.receive(conn.inlet, this.getDataForOutlet(outlet, data));
        });
    }

    @action
    disconnect(fromOutlet: number, to: RingoNode, inlet: number) {
        this.connections.delete(to.id);
    }

    @action
    connect(fromOutlet: number, to: RingoNode, inlet: number) {
        this.connections.set(to.id, {
            outlet: fromOutlet,
            inlet,
            nodeId: to.id,
        });
        this.onConnect(fromOutlet, to, inlet);
    }

    @action
    onConnect(fromOutlet: number, to: RingoNode, inlet: number) {

    }

    // after deserialization, we need to wait until all nodes exist before reconnecting
    @action
    reconnect() {
        console.log("reconnecting");

        this.connections.forEach((conn) => {
            console.log(conn);

            this.onConnect(conn.outlet, this.manager.getNode(conn.nodeId), conn.inlet);
        })
    }

    serialize() {
        return {
            id: this.id,
            type: this.type,
            attributes: this.attributes.serialize(),
            connections: Array.from(this.connections).reduce((prev, [id, conn]) => {
                console.log("conn", conn);

                return { ...prev, [conn.nodeId]: conn };
            }, {} as Record<string, unknown>)
        }
    }


}
