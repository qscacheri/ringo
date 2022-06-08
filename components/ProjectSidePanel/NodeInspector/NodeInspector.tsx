import React, { useState } from 'react';
import { RingoNode } from '../../../lib/nodes/core/RingoNode';
import { AttributeEditor } from './AttributeEditor';

interface NodeInspectorProps {
  node?: RingoNode;
}

export const NodeInspector: React.FC<NodeInspectorProps> = ({ node }) => {
  const [on, setOn] = useState(false);
  return (
    <div className="w-full col-start-2 bg-blue-200 p-4 flex-grow">
      {node && (
        <div>
          <p>{node.id}</p>
          {Array.from(node.getAttributes().attributes).map(([, attr]) => (
            <AttributeEditor
              key={`${node.id}-attr-${attr.name}`}
              node={node}
              attributeName={attr.name}
            />
          ))}
        </div>
      )}
    </div>
  );
};
