import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { DisplayNode } from '../lib/nodes/wobble/DisplayNode';

interface RingoDisplayNodeProps {
  node: DisplayNode;
}

const Container = styled.div`
  display: grid;
  grid-template-rows: repeat(3, minmax(0, 1fr));
`;

export const RingoDisplayNode: React.FC<RingoDisplayNodeProps> = ({ node }) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (ref.current) {
      node.setContainer(ref.current);
    }
  }, []);
  return (
    <div
      ref={ref}
      className="flex flex-col justify-around text-xs bg-white rounded w-[500px] h-[500px]"
    ></div>
  );
};
