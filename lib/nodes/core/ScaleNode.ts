import { RingoNodeAttributeList } from '../../RingoNodeAttributeList';
import { scale } from '../../scale';
import { Terminal } from '../../Terminal';
import { RingoAttributeType, RingoNodeType } from '../../types';
import { RingoNode } from './RingoNode';

export class ScaleNode extends RingoNode {
    getInitialAttributes(): RingoNodeAttributeList {
        return new RingoNodeAttributeList([
            { name: 'inputMin', type: RingoAttributeType.number, value: 0 },
            { name: 'inputMax', type: RingoAttributeType.number, value: 1 },
            { name: 'outputMin', type: RingoAttributeType.number, value: 0 },
            { name: 'outputMax', type: RingoAttributeType.number, value: 1 },
        ]);
    }

    getInletLayout(): Terminal[] {
        return [
            {
                name: 'value',
                type: 'any',
            },
            {
                name: 'input min',
                type: 'any',
            },
            {
                name: 'input max',
                type: 'any',
            },
            {
                name: 'output min',
                type: 'any',
            },
            {
                name: 'output max',
                type: 'any',
            },
        ];
    }

    getOutletLayout(): Terminal[] {
        return [{ name: 'scaled value', type: 'any' }];
    }

    getType(): RingoNodeType {
        return 'scale';
    }

    receive(inlet: number, data: unknown): void {
        switch (inlet) {
            case 0:
                this.send(0, data as number);
        }
    }

    getDataForOutlet(_: number, data: unknown): unknown {
        const inputMin = this.getAttribute('inputMin').value as number;
        const inputMax = this.getAttribute('inputMax').value as number;
        const outputMin = this.getAttribute('outputMin').value as number;
        const outputMax = this.getAttribute('outputMax').value as number;
        const value = data as number;
        return scale(value, inputMin, inputMax, outputMin, outputMax);
    }
}
