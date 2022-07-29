import { ToneAudioNode, UserMedia } from 'tone';
import { RingoNodeAttributeList } from '../../RingoNodeAttributeList';
import { Terminal } from '../../Terminal';
import { RingoAttributeType, RingoNodeType } from '../../types';
import { RingoAudioNode } from './RingoAudioNode';

export class MicNode extends RingoAudioNode {

    getType(): RingoNodeType {
        return 'mic';
    }

    onAttributeChange(key: string, _: unknown): void {
        switch (key) {
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

    getAudioNode(): ToneAudioNode {
        const media = new UserMedia()
        media.open()
        return media
    }
}
