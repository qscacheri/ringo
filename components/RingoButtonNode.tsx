import React from 'react';
import { RingoNode as RingoNodeType } from '../lib/nodes/core/RingoNode';

interface RingoButtonNodeProps {
  node: RingoNodeType;
}

export const RingoButtonNode: React.FC<RingoButtonNodeProps> = ({ node }) => {
  return (
    <button
      onClick={() => {
        node.send(0);
      }}
    >
      Click me
    </button>
  );
};
