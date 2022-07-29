import { ToneAudioNode } from 'tone';
import { GraphManager } from '../../../stores/GraphManager';
import { RingoNodeAttributeList } from '../../RingoNodeAttributeList';
import { RingoNodeFactory } from '../../RingoNodeFactory';
import { RingoNode, RingoNodeConstructorArgs, SerializedRingoNode } from '../core/RingoNode';

export class RingoAudioNode extends RingoNode {
    audioNode!: ToneAudioNode;

    override init(args: RingoNodeConstructorArgs) {
        super.init(args)
        this.audioNode = this.getAudioNode();
    }

    getAudioNode(): ToneAudioNode {
        throw new Error('Method not implemented.');
    }

    onConnect(fromOutlet: number, to: RingoNode, inlet: number): void {
        if (isRingoAudioNode(to)) {
            console.log('connecting audio nodes')
            this.audioNode.connect(to.audioNode, fromOutlet, inlet);
        }
    }

    static deserialize(graphManager: GraphManager, data: SerializedRingoNode) {
        const id = data.id;
        const attributes = RingoNodeAttributeList.deserialize(data.attributes);
        const connections = data.connections
        return RingoNodeFactory.createNode(data.type, { connections, graphManager, attributes, id });
    }
}

export function isRingoAudioNode(node: RingoNode): node is RingoAudioNode {
    return node instanceof RingoAudioNode;
}
