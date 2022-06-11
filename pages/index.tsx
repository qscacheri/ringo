import { observer, Observer } from 'mobx-react';
import { useEffect } from 'react';
import styled from 'styled-components';
import { GraphCanvas } from '../components/GraphCanvas';
import { GraphHeader } from '../components/GraphHeader';
import { useProjectStore } from '../components/ProjectProvider';
import { ProjectSidePanel } from '../components/ProjectSidePanel/ProjectSidePanel';
import { useKeyCombo } from '../hooks/useKeyCombo';

const Container = styled.div`
  display: grid;
  grid-template-rows: 4rem minmax(0, auto) 4rem;
  grid-template-columns: auto 16rem;
`;

const Home = observer(() => {
  const store = useProjectStore();
  const { metaDataStore } = store;
  useEffect(() => {
    document.addEventListener('mousemove', (e) => {
      metaDataStore.updateMousePos({ x: e.clientX, y: e.clientY });
    });

    (window as any).store = store;
  }, []);

  useKeyCombo('k', 'meta', () => {
    metaDataStore.setSearchActive(!metaDataStore.searchActive);
  });

  return (
    <Observer>
      {() => (
        <Container className="w-screen h-screen">
          <GraphHeader />
          <ProjectSidePanel />
          <GraphCanvas />
        </Container>
      )}
    </Observer>
  );
});

export default Home;
