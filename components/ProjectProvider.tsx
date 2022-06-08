import React, { ReactNode, useRef } from 'react';
import { ProjectStore } from '../stores/ProjectStore';

const ProjectStoreContext = React.createContext({} as ProjectStore);

export const useProjectStore = () => React.useContext(ProjectStoreContext);

export interface ProjectStoreProviderProps {
  children: ReactNode;
}

export const ProjectStoreProvider: React.FC<ProjectStoreProviderProps> = ({
  children,
}) => {
  const store = useRef(new ProjectStore());
  return (
    <ProjectStoreContext.Provider value={store.current}>
      {children}
    </ProjectStoreContext.Provider>
  );
};
