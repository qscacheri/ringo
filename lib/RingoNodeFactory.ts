import { OscillatorNode } from './nodes/audio/OscillatorNode';
import { AddNode } from './nodes/core/AddNode';
import { ButtonNode } from './nodes/core/ButtonNode';
import { PrintNode } from './nodes/core/PrintNode';
import { RandomNode } from './nodes/core/RandomNode';
import { RingoNode, RingoNodeConstructorArgs } from './nodes/core/RingoNode';
import { ScaleNode } from './nodes/core/ScaleNode';
import { TimerNode } from './nodes/core/TimerNode';
import { RingoNodeType } from './types';

export class RingoNodeFactory {
  static createNode(
    nodeType: RingoNodeType,
    args: RingoNodeConstructorArgs
  ): RingoNode {
    const type = nodeTypes[nodeType];
    return type.create(args);
  }
}

const nodeTypes: { [key: string]: typeof RingoNode } = {
  add: AddNode,
  timer: TimerNode,
  print: PrintNode,
  button: ButtonNode,
  oscillator: OscillatorNode,
  random: RandomNode,
  scale: ScaleNode,
};
