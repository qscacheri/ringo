import React, { ReactNode, useRef } from 'react';
import { GraphManager } from '../stores/GraphManager';

const GraphManagerContext = React.createContext({} as GraphManager);

export const useGraphManager = () => React.useContext(GraphManagerContext);

export interface GraphManagerProviderProps {
  children: ReactNode;
}

export const GraphManagerProvider: React.FC<GraphManagerProviderProps> = ({
  children,
}) => {
  const graphManager = useRef(new GraphManager());
  return (
    <GraphManagerContext.Provider value={graphManager.current}>
      {children}
    </GraphManagerContext.Provider>
  );
};
