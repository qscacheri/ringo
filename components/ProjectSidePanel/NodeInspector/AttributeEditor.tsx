import { observer } from 'mobx-react';
import React from 'react';
import { RingoNode } from '../../../lib/nodes/core/RingoNode';
import { RingoAttributeType } from '../../../lib/types';
import { Switch } from '../../Switch';
interface AttributeEditorProps {
  node: RingoNode;
  attributeName: string;
}

export const AttributeEditor: React.FC<AttributeEditorProps> = observer(
  ({ attributeName, node }) => {
    const element = (() => {
      switch (node.getAttribute(attributeName).type) {
        case RingoAttributeType.boolean:
          return (
            <Switch
              on={node.getAttribute(attributeName).value as boolean}
              onChange={(on) => {
                node.setAttribute(attributeName, on);
              }}
            />
          );
        case RingoAttributeType.number:
        case RingoAttributeType.string:
        default:
          return (
            <input
              type={
                node.getAttribute(attributeName).type ===
                RingoAttributeType.number
                  ? 'number'
                  : 'text'
              }
              value={node.getAttribute(attributeName).value as string}
              onChange={(e) => {
                node.setAttribute(attributeName, e.target.value);
              }}
            />
          );
      }
    })();

    return (
      <div>
        <p>{attributeName}</p>
        {element}
      </div>
    );
  }
);
