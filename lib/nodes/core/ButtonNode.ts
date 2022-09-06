import { BANG } from '../../bang';
import { RingoNodeAttributeList } from '../../RingoNodeAttributeList';
import { Terminal } from '../../Terminal';
import { RingoNodeType } from '../../types';
import { RingoNode } from './RingoNode';

export class ButtonNode extends RingoNode {
    getInitialAttributes(): RingoNodeAttributeList {
        return new RingoNodeAttributeList([]);
    }

    getInletLayout(): Terminal[] {
        return [];
    }

    getOutletLayout(): Terminal[] {
        return [{ name: 'data', type: 'any' }];
    }

    getDataForOutlet(_: number): unknown {
        return BANG
    }

    getType(): RingoNodeType {
        return 'button';
    }
}
