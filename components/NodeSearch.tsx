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
    metaDataStore: { setSearchActive },
  } = useProjectStore();
  const results = useSearch(search, RingoNodeTypes as unknown as string[]);
  const itemsToShow = search ? results : RingoNodeTypes;
  return (
    <Draggable
      defaultClassName="fixed"
      onDrag={(e, data) => {
        console.log({ e, data });
      }}
      defaultPosition={position}
    >
      <div className="w-96 bg-purple-800 p-2 rounded shadow">
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
                graphManager.createNode(result as RingoNodeType);
                setSearchActive(false);
              }}
              className="bg-white my-2 h-8 rounded w-full"
            >
              {result}
            </button>
          ))}
        </div>
      </div>
    </Draggable>
  );
};
