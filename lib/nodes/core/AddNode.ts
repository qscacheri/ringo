import { RingoNodeAttributeList } from '../../RingoObjectAttributeList';
import { Terminal } from '../../Terminal';
import { RingoNodeType } from '../../types';
import { RingoNode } from './RingoNode';

export class AddNode extends RingoNode {
  getType(): RingoNodeType {
    return 'add';
  }
  getInletLayout(): Terminal[] {
    return [
      { name: 'number1', type: 'any' },
      { name: 'number2', type: 'any' },
    ];
  }
  getOutletLayout(): Terminal[] {
    return [
      {
        name: 'sum',
        type: 'any',
      },
    ];
  }
  getInitialAttributes(): RingoNodeAttributeList {
    return new RingoNodeAttributeList([]);
  }
  receiveData(inlet: number, data: unknown): void {
    throw new Error('Method not implemented.');
  }
}

const n = AddNode.create({} as any);
