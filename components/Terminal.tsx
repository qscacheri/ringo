import React, { useMemo, useState } from 'react';
import { RingoNode } from '../lib/nodes/core/RingoNode';
import { PatchCable } from '../lib/PatchCable';
import { TerminalType } from '../lib/types';
import { useProjectStore } from './ProjectProvider';

interface TerminalProps {
  node: RingoNode;
  type: TerminalType;
  index: number;
}

export const Terminal: React.FC<TerminalProps> = ({ node, type, index }) => {
  const [showToolTip, setShowToolTip] = useState(false);
  const toolTipText = useMemo(() => {
    if (type === 'in') {
      return node.getInletLayout()[index].name;
    }
    return node.getOutletLayout()[index].name;
  }, [node, type]);
  const { metaDataStore } = useProjectStore();
  return (
    <button
      onMouseEnter={() => setShowToolTip(true)}
      onMouseLeave={() => setShowToolTip(false)}
      data-terminal-id={PatchCable.getTerminalId(node, index, type)}
      onClick={() => {
        metaDataStore.handleTerminalClicked(node, index, type);
      }}
      className="relative h-full mx-1 bg-white rounded-full cursor-pointer aspect-square hover:outline hover:outline-blue-400"
    >
      {showToolTip && (
        <div
          className={`bg-white-200 p-2 rounded shadow fixed ${
            type === 'in' ? 'bottom-full' : 'top-full'
          }`}
        >
          {toolTipText}
        </div>
      )}
    </button>
  );
};
