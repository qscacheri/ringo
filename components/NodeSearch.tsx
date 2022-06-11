import React, { useState } from 'react';
import Draggable from 'react-draggable';
import { useSearch } from '../hooks/useSearch';
import { Point, RingoNodeType, RingoNodeTypes } from '../lib/types';
import { useProjectStore } from './ProjectProvider';

interface NodeSearchProps {
  position: Point;
}

export const NodeSearch: React.FC<NodeSearchProps> = ({ position }) => {
  const [search, setSearch] = useState('');
  const {
    graphManager,
    metaDataStore: { setSearchActive, addNode },
  } = useProjectStore();
  const results = useSearch(search, RingoNodeTypes as unknown as string[]);
  const itemsToShow = search ? results : RingoNodeTypes;
  return (
    <Draggable defaultClassName="fixed" defaultPosition={position}>
      <div className="p-2 bg-purple-800 rounded shadow w-96">
        <input
          autoFocus={true}
          className="w-full h-10 px-2 rounded"
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <div className="flex flex-col">
          {itemsToShow.map((result) => (
            <button
              key={`node-search-${result}`}
              onClick={() => {
                const node = graphManager.createNode(result as RingoNodeType);
                addNode(node);
                setSearchActive(false);
              }}
              className="w-full h-8 my-2 bg-white rounded"
            >
              {result}
            </button>
          ))}
        </div>
      </div>
    </Draggable>
  );
};
