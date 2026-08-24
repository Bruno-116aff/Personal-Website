import { StrictMode } from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';

import App from './App';
import { initializeAnalytics } from './lib/analytics';
import { initializeMotion } from './components/motion';
import './styles/index.css';

initializeMotion();
initializeAnalytics();

const rootElement = document.getElementById('root')!;
const application = (
  <StrictMode>
    <App pathname={window.location.pathname} githubUrl={import.meta.env.VITE_GITHUB_URL} />
  </StrictMode>
);

if (rootElement.hasChildNodes()) {
  hydrateRoot(rootElement, application);
} else {
  createRoot(rootElement).render(application);
}
