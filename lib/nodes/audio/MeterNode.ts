import { Meter as ToneMeter, ToneAudioNode } from 'tone';
import { RingoNodeAttributeList } from '../../RingoNodeAttributeList';
import { Terminal } from '../../Terminal';
import { RingoAttributeType, RingoNodeType } from '../../types';
import { RingoNodeConstructorArgs } from '../core/RingoNode';
import { RingoAudioNode } from './RingoAudioNode';

export class MeterNode extends RingoAudioNode {
    callbackFn: number
    audioNode!: ToneMeter

    constructor(args: RingoNodeConstructorArgs) {
        super(args);
        this.getLevel = this.getLevel.bind(this);
        this.callbackFn = window.setInterval(this.getLevel, this.getAttribute('rate').value as number);
    }
    getType(): RingoNodeType {
        return 'meter';
    }

    getLevel(): void {
        this.send(0);
    }

    onAttributeChange(key: string, value: unknown): void {
        switch (key) {
            case 'rate':
                clearInterval(this.callbackFn);
                this.callbackFn = window.setInterval(this.getLevel, this.getAttribute('rate').value as number);
        }
    }

    getInletLayout(): Terminal[] {
        return [
            { name: 'audio signal', type: 'audio' },
        ];
    }

    getOutletLayout(): Terminal[] {
        return [
            {
                name: 'level',
                type: 'any',
            },
        ];
    }

    getInitialAttributes(): RingoNodeAttributeList {
        return new RingoNodeAttributeList([
            { name: "rate", value: 1000, type: RingoAttributeType.number },
        ]);
    }

    getDataForOutlet(outlet: number, data?: unknown): unknown {
        return (this.audioNode as ToneMeter).getValue();
    }

    getAudioNode(): ToneAudioNode {
        const meter = new ToneMeter()
        meter.channelCount = 1
        meter.channelCountMode = 'explicit'
        return meter
    }
}
