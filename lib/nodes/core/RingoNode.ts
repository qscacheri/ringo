import { action, computed, observable } from 'mobx';
import { v4 as uuid } from 'uuid';
import { GraphManager } from '../../../stores/GraphManager';
import { RingoNodeAttributeList } from '../../RingoObjectAttributeList';
import { Terminal } from '../../Terminal';
import { RingoAttributeType, RingoNodeType } from '../../types';
export type StaticThis<T> = { new (args: RingoNodeConstructorArgs): T };

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
};

export class RingoNode {
  id: string;
  manager: GraphManager;
  @observable attributes: RingoNodeAttributeList;
  type: RingoNodeType;

  @observable connections: Map<string, RingoNodeConnection> = new Map<
    string,
    RingoNodeConnection
  >();

  constructor(args: RingoNodeConstructorArgs) {
    const { id, graphManager } = args;
    this.manager = graphManager;
    this.attributes = this.getInitialAttributes();
    this.type = this.getType();
    if (id) {
      this.id = id;
    } else {
      this.id = uuid();
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

  getAttribute(key: string): RingoNodeAttribute {
    return this.attributes.get(key);
  }

  getDataForOutlet(outlet: number, data?: unknown): unknown {
    throw new Error('Method not implemented.');
  }

  onAttributeChange(key: string, value: unknown) {}

  @action
  setAttribute(name: string, value: unknown) {
    this.attributes.set(name, value);
    this.onAttributeChange(name, value);
  }

  send(outlet: number, data?: unknown) {
    Array.from(this.connections).forEach(([id, conn]) => {
      if (conn.outlet !== outlet) return;
      const receivingNode = this.manager.getNode(id);
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
  }
}
