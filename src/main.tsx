import { StrictMode } from 'react';
import { hydrateRoot } from 'react-dom/client';

import App from './App';
import { initializeAnalytics } from './lib/analytics';
import './styles/index.css';

initializeAnalytics();

hydrateRoot(document.getElementById('root')!,
  <StrictMode>
    <App
      pathname={window.location.pathname}
      githubUrl={import.meta.env.VITE_GITHUB_URL}
    />
  </StrictMode>,
);
