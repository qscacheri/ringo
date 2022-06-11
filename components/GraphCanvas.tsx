import { observer } from 'mobx-react';
import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { ActivePatchCableComponent } from './ActivePatchCableComponent';
import { NodeSearch } from './NodeSearch';
import { PatchCable } from './PatchCable';
import { useProjectStore } from './ProjectProvider';
import { RingoNodeComponentFactory } from './RingoNodeComponentFactory';

interface GraphCanvasProps {}

const Container = styled.div`
  background-size: 40px 40px;
  background-image: radial-gradient(circle, #000000 1px, rgba(0, 0, 0, 0) 1px);
`;
export const GraphCanvas: React.FC<GraphCanvasProps> = observer(({}) => {
  const { uiStore, graphManager, metaDataStore } = useProjectStore();
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (ref.current) {
      uiStore.setCanvasBounds(ref.current.getBoundingClientRect());
    }
  }, []);
  return (
    <div
      className="w-full h-full row-start-2 overflow-scroll bg-white"
      ref={ref}
    >
      <Container
        className="w-[1000vw] h-[1000vh] relative"
        onClick={() => metaDataStore.clearSelectedNodes()}
      >
        {Array.from(graphManager.nodes.values()).map((node) => (
          <RingoNodeComponentFactory
            position={metaDataStore.getNode(node.id)}
            node={node}
          />
        ))}
        {metaDataStore.activeCable && (
          <ActivePatchCableComponent
            activePatchCable={metaDataStore.activeCable}
          ></ActivePatchCableComponent>
        )}
        {metaDataStore.searchActive && (
          <NodeSearch position={metaDataStore.mousePos} />
        )}
        {metaDataStore.patchCables.toArray().map(([id, cable]) => (
          <PatchCable key={`pc-${id}`} patchCable={cable} />
        ))}
      </Container>
    </div>
  );
});
