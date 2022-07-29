import { getDestination, ToneAudioNode, Volume } from 'tone';
import { RingoNodeAttributeList } from '../../RingoNodeAttributeList';
import { Terminal } from '../../Terminal';
import { RingoAttributeType, RingoNodeType } from '../../types';
import { RingoAudioNode } from './RingoAudioNode';

export class SpeakerNode extends RingoAudioNode {
    getType(): RingoNodeType {
        return 'speaker';
    }

    onAttributeChange(key: string, value: unknown): void {
        switch (key) {
            case 'active':
                if (value === true) {
                    (this.audioNode as Volume).volume.value = 1;
                } else {
                    (this.audioNode as Volume).volume.value = -Infinity;
                }
                return;
        }
    }

    getInletLayout(): Terminal[] {
        return [
            {
                name: 'audio input',
                type: 'audio',
            },
        ];
    }

    getOutletLayout(): Terminal[] {
        return [];
    }

    receive(_: number, data: unknown): void {
        this.setAttribute('active', data as boolean);
    }

    getInitialAttributes(): RingoNodeAttributeList {
        return new RingoNodeAttributeList([
            { name: 'active', value: true, type: RingoAttributeType.boolean }
        ]);
    }

    getAudioNode(): ToneAudioNode {
        return new Volume().connect(getDestination());
    }
}
