import { Oscillator, ToneAudioNode } from 'tone';
import { RingoNodeAttributeList } from '../../RingoNodeAttributeList';
import { Terminal } from '../../Terminal';
import { RingoAttributeType, RingoNodeType } from '../../types';
import { RingoAudioNode } from './RingoAudioNode';
export class OscillatorNode extends RingoAudioNode {
    getType(): RingoNodeType {
        return 'oscillator';
    }

    onAttributeChange(key: string, value: unknown): void {
        switch (key) {
            case 'frequency':
                (this.audioNode as Oscillator).frequency.value = value as number;
                return;
            case 'active':
                if (value === true) {
                    (this.audioNode as Oscillator).start();
                } else {
                    (this.audioNode as Oscillator).stop();
                }
                return;
        }
    }

    getInletLayout(): Terminal[] {
        return [
            {
                name: 'frequency',
                type: 'any',
            },
            {
                name: 'active',
                type: 'any',
            },
        ];
    }

    getOutletLayout(): Terminal[] {
        return [
            {
                name: 'output',
                type: 'audio',
            },
        ];
    }

    receive(inlet: number, data: unknown): void {
        switch (inlet) {
            case 0:
                this.setAttribute('frequency', data);
                (this.audioNode as Oscillator).frequency.value = data as number;
                return;
        }
    }

    getInitialAttributes(): RingoNodeAttributeList {
        return new RingoNodeAttributeList([
            { name: 'frequency', value: 440, type: RingoAttributeType.number },
            { name: 'active', value: true, type: RingoAttributeType.boolean },
        ]);
    }
    getAudioNode(): ToneAudioNode {
        return new Oscillator().start()
    }
}
