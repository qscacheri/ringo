import type { AppProps } from 'next/app';
import { ProjectStoreProvider } from '../components/ProjectProvider';
import '../styles/globals.css';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ProjectStoreProvider>
      <Component {...pageProps} />
    </ProjectStoreProvider>
  );
}
export default MyApp;
