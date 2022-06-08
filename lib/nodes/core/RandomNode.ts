import { RingoNodeAttributeList } from '../../RingoObjectAttributeList';
import { Terminal } from '../../Terminal';
import { RingoNodeType } from '../../types';
import { RingoNode } from './RingoNode';

export class RandomNode extends RingoNode {
  getInitialAttributes(): RingoNodeAttributeList {
    return new RingoNodeAttributeList([]);
  }

  getInletLayout(): Terminal[] {
    return [{ name: 'data', type: 'any' }];
  }

  getOutletLayout(): Terminal[] {
    return [{ name: 'data', type: 'any' }];
  }

  getDataForOutlet(_: number): unknown {
    return Math.random();
  }

  receive(_: number, __: unknown): void {
    this.send(0);
  }

  getType(): RingoNodeType {
    return 'random';
  }
}
