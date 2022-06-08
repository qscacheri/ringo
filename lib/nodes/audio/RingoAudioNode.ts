import { ToneAudioNode } from 'tone';
import { RingoNode, RingoNodeConstructorArgs } from '../core/RingoNode';

export class RingoAudioNode extends RingoNode {
  audioNode: ToneAudioNode;
  constructor(args: RingoNodeConstructorArgs) {
    super(args);
    this.audioNode = this.getAudioNode();
  }

  getAudioNode(): ToneAudioNode {
    throw new Error('Method not implemented.');
  }

  connect(fromOutlet: number, to: RingoNode, inlet: number): void {
    super.connect(fromOutlet, to, inlet);
    if (isRingoAudioNode(to)) {
      this.audioNode.connect(to.audioNode, fromOutlet, inlet);
    }
  }
}

export function isRingoAudioNode(node: RingoNode): node is RingoAudioNode {
  return node instanceof RingoAudioNode;
}
