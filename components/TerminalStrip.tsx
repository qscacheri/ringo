import React from 'react';
import { RingoNode } from '../lib/nodes/core/RingoNode';
import { TerminalType } from '../lib/types';
import { Terminal } from './Terminal';

interface TerminalStripProps {
  node: RingoNode;
  numTerminals: number;
  type: TerminalType;
}

export const TerminalStrip: React.FC<TerminalStripProps> = ({
  numTerminals,
  node,
  type,
}) => {
  return (
    <div className="flex w-full h-full p-1">
      {[...Array(numTerminals)].map((_, i) => (
        <Terminal
          key={`${node.id}-${type}-${i}`}
          index={i}
          node={node}
          type={type}
        />
      ))}
    </div>
  );
};
