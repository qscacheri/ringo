import React from 'react';
import { RingoNode } from '../lib/nodes/core/RingoNode';
import { PatchCable } from '../lib/PatchCable';
import { TerminalType } from '../lib/types';
import { useProjectStore } from './ProjectProvider';

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
  const { metaDataStore } = useProjectStore();

  return (
    <div className="w-full h-full flex p-1">
      {[...Array(numTerminals)].map((_, i) => (
        <button
          data-terminal-id={PatchCable.getTerminalId(node, i, type)}
          onClick={() => {
            metaDataStore.handleTerminalClicked(node, i, type);
          }}
          key={`${node.id}-${type}-${i}`}
          className="rounded-full h-full aspect-square bg-white mx-1 hover:outline hover:outline-blue-400 cursor-pointer"
        ></button>
      ))}
    </div>
  );
};
