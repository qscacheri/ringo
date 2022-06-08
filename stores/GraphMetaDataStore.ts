import { Map } from 'immutable';
import { makeAutoObservable } from 'mobx';
import { RingoNode } from '../lib/nodes/core/RingoNode';
import { ActivePatchCable, PatchCable } from '../lib/PatchCable';
import { Point, Rectangle, TerminalType } from '../lib/types';
import { GraphManager } from './GraphManager';

export class GraphMetaDataStore {
  nodeBounds: Map<string, any> = Map<string, Rectangle>();
  patchCables: Map<string, any> = Map<string, PatchCable>();
  graphManager: GraphManager;
  activeCable: null | ActivePatchCable = null;
  mousePos: Point = { x: 0, y: 0 };
  selectedNodes: RingoNode[] = [];
  searchActive = false;
  selectedPatchCables: PatchCable[] = [];

  constructor(graphManager: GraphManager) {
    makeAutoObservable(this);
    this.graphManager = graphManager;
    this.setSearchActive = this.setSearchActive.bind(this);
  }

  updateMousePos(pos: Point) {
    if (!this.searchActive) {
      this.mousePos = pos;
    }
  }

  setSelectedNodes(nodes: RingoNode[]) {
    this.selectedNodes = nodes;
  }

  clearSelectedNodes() {
    this.selectedNodes = [];
  }

  updateNodePos(node: RingoNode, pos: Point) {
    this.nodeBounds = this.nodeBounds.set(node.id, pos);
  }

  setSearchActive(isActive: boolean) {
    this.searchActive = isActive;
  }

  handleTerminalClicked(node: RingoNode, index: number, type: TerminalType) {
    if (this.activeCable) {
      console.log('Cable already active');

      // input to input or output to output
      if (this.activeCable.type !== type) {
        console.log('Cable type matches');

        const outNode =
          this.activeCable.type === TerminalType.out
            ? this.activeCable.termination.node
            : node;
        const inNode =
          this.activeCable.type === TerminalType.out
            ? node
            : this.activeCable.termination.node;
        const outIndex =
          this.activeCable.type === TerminalType.out
            ? this.activeCable.termination.index
            : index;
        const inIndex =
          this.activeCable.type === TerminalType.out
            ? index
            : this.activeCable.termination.index;
        console.log('connecting', outNode, outIndex, inNode, inIndex);

        const connected = this.graphManager.connectNodes(
          outNode,
          outIndex,
          inNode,
          inIndex
        );
        if (connected) {
          let newCable: PatchCable;
          if (type === TerminalType.out) {
            newCable = new PatchCable({
              outletTermination: { index, node },
              inletTermination: {
                index: this.activeCable.termination.index,
                node: this.activeCable.termination.node,
              },
            });
          } else {
            newCable = new PatchCable({
              outletTermination: {
                index: this.activeCable.termination.index,
                node: this.activeCable.termination.node,
              },
              inletTermination: { index, node },
            });
          }
          this.patchCables = this.patchCables.set(newCable.id, newCable);
          this.activeCable = null;
        }
      }
    } else {
      const newCable = new ActivePatchCable({ index, node }, type);
      this.activeCable = newCable;
    }
  }
}
