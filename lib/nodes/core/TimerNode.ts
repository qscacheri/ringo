import { RingoNodeAttributeList } from '../../RingoNodeAttributeList';
import { Terminal } from '../../Terminal';
import { RingoAttributeType, RingoNodeType } from '../../types';
import { RingoNode, RingoNodeConstructorArgs } from './RingoNode';

export class TimerNode extends RingoNode {
    timerFn: number;

    constructor(args: RingoNodeConstructorArgs) {
        super(args);
        this.timerFn = window.setInterval(
            (() => {
                this.send(0);
            }).bind(this),
            this.attributes.get('rate').value as number
        );
    }

    getInitialAttributes(): RingoNodeAttributeList {
        return new RingoNodeAttributeList([
            { name: 'rate', value: 1000, type: RingoAttributeType.number },
            { name: 'active', value: true, type: RingoAttributeType.boolean },
        ]);
    }

    getInletLayout(): Terminal[] {
        return [
            {
                name: 'active',
                type: 'any',
            },
            {
                name: 'rate',
                type: 'any',
            },
        ];
    }

    getOutletLayout(): Terminal[] {
        return [
            {
                name: 'output',
                type: 'any',
            },
        ];
    }

    onAttributeChange(key: string, value: unknown) {
        switch (key) {
            case 'rate':
                clearInterval(this.timerFn);
                this.timerFn = window.setInterval(
                    (() => {
                        this.send(0);
                    }).bind(this),
                    this.attributes.get('rate').value as number
                );
                return;
            case 'active':
                if (value === true) {
                    this.timerFn = window.setInterval(
                        (() => {
                            this.send(0);
                        }).bind(this),
                        this.attributes.get('rate').value as number
                    );
                } else {
                    clearInterval(this.timerFn);
                }
                return;
            default:
                throw new Error('Method not implemented.');
        }
    }

    getDataForOutlet(_: number): unknown {
        return 'hello';
    }

    receive(_: number, data: unknown): void {
        console.log('timer received', data);
        this.attributes.set('rate', data);
    }

    getType(): RingoNodeType {
        return 'timer';
    }
}
