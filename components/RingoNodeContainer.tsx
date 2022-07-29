import { observer } from 'mobx-react';
import React from 'react';
import Draggable from 'react-draggable';
import styled from 'styled-components';
import { RingoNode as RingoNodeType } from '../lib/nodes/core/RingoNode';
import { Point, TerminalType } from '../lib/types';
import { useProjectStore } from './ProjectProvider';
import { TerminalStrip } from './TerminalStrip';

interface RingoNodeContainerProps {
  node: RingoNodeType;
  element: JSX.Element;
  position: Point;
}

const Container = styled.div`
  display: grid;
  grid-template-rows: 1rem minmax(0, auto) 1rem;
`;

export const RingoNodeContainer: React.FC<RingoNodeContainerProps> = observer(
  ({ node, element, position }) => {
    const { metaDataStore } = useProjectStore();
    return (
      <Draggable
        defaultClassName="absolute"
        position={position}
        onDrag={(_, data) => {
          metaDataStore.updateNodePos(node, {
            x: data.x,
            y: data.y,
          });
        }}
      >
        <Container
          className={`min-w-[14rem] bg-purple-400 rounded shadow ${
            metaDataStore.selectedNodes[0]?.id === node.id &&
            'outline outline-blue-400'
          }`}
          onClick={(e) => {
            e.stopPropagation();
            metaDataStore.setSelectedNodes([node]);
          }}
        >
          <TerminalStrip
            node={node}
            numTerminals={node.getInletLayout().length}
            type={TerminalType.in}
          />
          {element}
          <TerminalStrip
            node={node}
            numTerminals={node.getOutletLayout().length}
            type={TerminalType.out}
          />
        </Container>
      </Draggable>
    );
  }
);
