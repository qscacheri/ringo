import React, { Children, ReactNode, useRef, useState } from 'react';
import { v4 as uuid } from 'uuid';

interface TabbedContainerProps {
  className?: string;
  tabs: string[];
  children: ReactNode;
  position?: 'above' | 'below';
}

export const TabbedContainer: React.FC<TabbedContainerProps> = ({
  className = '',
  tabs,
  children,
  position = 'below',
}) => {
  const [selectedTab, setSelectedTab] = useState(0);
  const containerId = useRef(uuid());
  return (
    <div className={`${className} w-full h-full flex flex-col`}>
      {position === 'below' && (
        <header className="w-full h-8 flex">
          {tabs.map((name, i) => (
            <Tab
              onClick={() => setSelectedTab(i)}
              key={`tab-${containerId}-${i}`}
              name={name}
              selected={selectedTab === i}
            />
          ))}
        </header>
      )}
      {Children.toArray(children)[selectedTab]}
      {position === 'above' && (
        <footer className="w-full h-8 flex">
          {tabs.map((name, i) => (
            <Tab
              onClick={() => setSelectedTab(i)}
              key={`tab-${containerId}-${i}`}
              name={name}
              selected={selectedTab === i}
            />
          ))}
        </footer>
      )}
    </div>
  );
};

interface TabProps {
  name: string;
  selected: boolean;
  onClick: () => void;
}
const Tab = ({ name, onClick, selected }: TabProps) => {
  return (
    <button
      onClick={onClick}
      className={`bg-neutral-100 flex-grow rounded grid place-items-center justify-around ${
        selected ? 'bg-neutral-300' : ''
      }`}
    >
      {name}
    </button>
  );
};
