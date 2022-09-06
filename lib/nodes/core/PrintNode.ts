import { isBang } from '../../bang';
import { RingoNodeAttributeList } from '../../RingoNodeAttributeList';
import { Terminal } from '../../Terminal';
import { RingoNodeType } from '../../types';
import { RingoNode } from './RingoNode';

export class PrintNode extends RingoNode {
    receive(_: number, data: unknown): void {
        if (isBang(data)) {
            this.manager.addMessage("<BANG!>")
        }
        else {
            this.manager.addMessage(data as string);
        }
    }

    getInitialAttributes(): RingoNodeAttributeList {
        return new RingoNodeAttributeList([]);
    }

    getInletLayout(): Terminal[] {
        return [{ name: 'data', type: 'any' }];
    }

    getOutletLayout(): Terminal[] {
        return [];
    }

    getType(): RingoNodeType {
        return 'print';
    }
}
