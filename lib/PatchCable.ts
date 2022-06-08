import { v4 as uuid } from 'uuid';
import { RingoNode } from './nodes/core/RingoNode';
import { Point, TerminalType } from './types';

export type PatchCableTermination = {
  node: RingoNode;
  index: number;
};

export interface PatchCableConstructorArgs {
  id?: string;
  outletTermination: PatchCableTermination;
  inletTermination: PatchCableTermination;
  intermediatePoints?: Point[];
}

export class PatchCable {
  id: string;
  outletTermination: PatchCableTermination;
  inletTermination: PatchCableTermination;
  intermediatePoints: Point[] = [];

  constructor({
    id,
    intermediatePoints,
    outletTermination,
    inletTermination,
  }: PatchCableConstructorArgs) {
    this.id = id ? id : uuid();
    this.outletTermination = outletTermination;
    this.inletTermination = inletTermination;
    this.intermediatePoints = intermediatePoints || [];
  }

  getOutletTerminalId(): string {
    return `${this.outletTermination.node.id}-${TerminalType.out}-${this.outletTermination.index}`;
  }

  getInletTerminalId(): string {
    return `${this.inletTermination.node.id}-${TerminalType.in}-${this.inletTermination.index}`;
  }

  static getTerminalId(
    node: RingoNode,
    index: number,
    type: TerminalType
  ): string {
    return `${node.id}-${type}-${index}`;
  }
}

export class ActivePatchCable {
  termination: PatchCableTermination;
  type: TerminalType;
  intermediatePoints: Point[] = [];

  getTerminalId(): string {
    return `${this.termination.node.id}-${this.type}-${this.termination.index}`;
  }

  constructor(termination: PatchCableTermination, type: TerminalType) {
    this.termination = termination;
    this.type = type;
  }
}
