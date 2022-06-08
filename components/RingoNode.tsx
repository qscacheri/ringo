import React from 'react';
import styled from 'styled-components';
import { RingoNode as RingoNodeType } from '../lib/nodes/core/RingoNode';

interface RingoNodeProps {
  node: RingoNodeType;
}

const Container = styled.div`
  display: grid;
  grid-template-rows: repeat(3, minmax(0, 1fr));
`;

export const RingoNode: React.FC<RingoNodeProps> = ({ node }) => {
  return (
    <div className="flex flex-col justify-around h-full bg-white p-2 text-xs rounded mx-2">
      {node.type}
    </div>
  );
};
