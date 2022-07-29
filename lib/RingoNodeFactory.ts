import { GraphManager } from '../stores/GraphManager';
import { MeterNode } from './nodes/audio/MeterNode';
import { MicNode } from './nodes/audio/MicNode';
import { OscillatorNode } from './nodes/audio/OscillatorNode';
import { SpeakerNode } from './nodes/audio/SpeakerNode';
import { AddNode } from './nodes/core/AddNode';
import { ButtonNode } from './nodes/core/ButtonNode';
import { PrintNode } from './nodes/core/PrintNode';
import { RandomNode } from './nodes/core/RandomNode';
import { RingoNode, RingoNodeConstructorArgs, SerializedRingoNode } from './nodes/core/RingoNode';
import { ScaleNode } from './nodes/core/ScaleNode';
import { TimerNode } from './nodes/core/TimerNode';
import { CubeNode } from './nodes/wobble/CubeNode';
import { DisplayNode } from './nodes/wobble/DisplayNode';
import { RingoNodeAttributeList } from './RingoNodeAttributeList';
import { RingoNodeType } from './types';

export class RingoNodeFactory {
    static createNode(
        nodeType: RingoNodeType,
        args: RingoNodeConstructorArgs
    ): RingoNode {
        const type = nodeTypes[nodeType];
        return type.create(args);
    }

    static deserialize(graphManager: GraphManager, data: SerializedRingoNode) {
        const id = data.id;
        const attributes = RingoNodeAttributeList.deserialize(data.attributes);
        const connections = data.connections
        return RingoNodeFactory.createNode(data.type, { connections, graphManager, attributes, id });
    }
}

const nodeTypes: { [key: string]: typeof RingoNode } = {
    add: AddNode,
    timer: TimerNode,
    print: PrintNode,
    button: ButtonNode,
    oscillator: OscillatorNode,
    random: RandomNode,
    scale: ScaleNode,
    oscilliator: OscillatorNode,
    display: DisplayNode,
    cube: CubeNode,
    speaker: SpeakerNode,
    meter: MeterNode,
    mic: MicNode
};
