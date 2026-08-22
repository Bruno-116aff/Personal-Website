import type { ReactNode } from 'react';

import { trackAnalyticsEvent } from '../lib/analytics';

type SiteShellProps = {
  pathname: string;
  children: ReactNode;
};

function homepageAnchor(pathname: string, id: string) {
  return pathname === '/' ? `#${id}` : `/#${id}`;
}

export default function SiteShell({ pathname, children }: SiteShellProps) {
  const isHome = pathname === '/';
  const isCv = pathname === '/cv';

  return (
    <div className="site-shell">
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>

      <header className="site-header">
        <nav className="site-nav" aria-label="Primary navigation">
          <a
            className="site-wordmark"
            href="/"
            aria-label="Ivan Hubko home"
            aria-current={isHome ? 'page' : undefined}
          >
            <span aria-hidden="true" className="site-wordmark-mark">IH</span>
            <span>Ivan Hubko</span>
          </a>

          <div className="site-nav-links">
            <a href={homepageAnchor(pathname, 'work')}>
              Work
            </a>
            <a href={homepageAnchor(pathname, 'about')}>About</a>
            <a href={homepageAnchor(pathname, 'contact')}>Contact</a>
            <a
              href="/cv"
              aria-current={isCv ? 'page' : undefined}
              onClick={() => trackAnalyticsEvent('cv_click')}
            >
              CV
              <span aria-hidden="true"> ↗</span>
            </a>
          </div>
        </nav>
      </header>

      <main id="main-content" className="site-main" tabIndex={-1}>
        {children}
      </main>

      <footer className="site-footer">
        <div className="site-footer-inner">
          <a href="/">Ivan Hubko</a>
        </div>
      </footer>
    </div>
  );
}
