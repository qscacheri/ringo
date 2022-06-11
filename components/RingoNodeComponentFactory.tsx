import { observer } from 'mobx-react';
import React, { useMemo } from 'react';
import { RingoNode as RingoNodeType } from '../lib/nodes/core/RingoNode';
import { Point } from '../lib/types';
import { RingoButtonNode } from './RingoButtonNode';
import { RingoNode } from './RingoNode';
import { RingoNodeContainer } from './RingoNodeContainer';

interface RingoNodeComponentFactoryProps {
  node: RingoNodeType;
  position: Point;
}

export const RingoNodeComponentFactory: React.FC<RingoNodeComponentFactoryProps> =
  observer(({ node, position }) => {
    const component = useMemo(() => {
      switch (node.type) {
        case 'button':
          return <RingoButtonNode node={node} />;
        default:
          return <RingoNode node={node} />;
      }
    }, [node]);

    return (
      <RingoNodeContainer position={position} node={node} element={component} />
    );
  });
