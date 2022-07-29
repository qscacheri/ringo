import { observer } from 'mobx-react';
import React from 'react';
import { useProjectStore } from '../ProjectProvider';
import { TabbedContainer } from '../TabbedContainer';
import { Console } from './Console/Console';
import { NodeInspector } from './NodeInspector';
interface ProjectSidePanelProps {}

export const ProjectSidePanel: React.FC<ProjectSidePanelProps> = observer(
  ({}) => {
    const { metaDataStore, graphManager } = useProjectStore();
    return (
      <div className="w-full h-full col-start-2 p-4">
        <TabbedContainer tabs={['Inspector', 'Console']} position="above">
          <NodeInspector node={metaDataStore.selectedNodes[0]} />
          <Console messages={graphManager.messages} />
        </TabbedContainer>
      </div>
    );
  }
);
