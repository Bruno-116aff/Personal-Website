export type SiteRouteKind = 'home' | 'case-study' | 'cv' | 'not-found';

export type SiteRouteTitleKey =
  | 'home'
  | 'infrastructureReliability'
  | 'operationsAutomation'
  | 'unifiedPlatform'
  | 'accountAutomation'
  | 'cv'
  | 'notFound';

export type SiteRoute = {
  path: string;
  kind: SiteRouteKind;
  titleKey: SiteRouteTitleKey;
  public: boolean;
  heading: string;
  summary: string;
};

export const siteRoutes = [
  {
    path: '/',
    kind: 'home',
    titleKey: 'home',
    public: true,
    heading: 'Ivan Hubko',
    summary: 'Senior Backend Engineer & Tech Lead',
  },
  {
    path: '/work/infrastructure-reliability',
    kind: 'case-study',
    titleKey: 'infrastructureReliability',
    public: true,
    heading: 'Infrastructure Reliability',
    summary: 'Case study',
  },
  {
    path: '/work/operations-automation',
    kind: 'case-study',
    titleKey: 'operationsAutomation',
    public: true,
    heading: 'Operations Automation',
    summary: 'Case study',
  },
  {
    path: '/work/unified-platform',
    kind: 'case-study',
    titleKey: 'unifiedPlatform',
    public: true,
    heading: 'Unified Platform',
    summary: 'Case study',
  },
  {
    path: '/work/account-automation',
    kind: 'case-study',
    titleKey: 'accountAutomation',
    public: true,
    heading: 'Account Automation',
    summary: 'Case study',
  },
  {
    path: '/cv',
    kind: 'cv',
    titleKey: 'cv',
    public: true,
    heading: 'Curriculum Vitae',
    summary: 'Ivan Hubko — Senior Backend Engineer & Tech Lead',
  },
  {
    path: '/404',
    kind: 'not-found',
    titleKey: 'notFound',
    public: false,
    heading: 'Page not found',
    summary: 'The requested path is not on the map.',
  },
] as const satisfies readonly SiteRoute[];

export const publicSiteRoutes = siteRoutes.filter((route) => route.public);
export const notFoundRoute = siteRoutes.find((route) => route.kind === 'not-found')!;

export function routeHtmlPath(route: SiteRoute) {
  return route.path === '/' ? 'index.html' : `${route.path.slice(1)}/index.html`;
}

export function routePathFromHtmlPath(file: string) {
  if (file === 'index.html') return '/';
  if (!file.endsWith('/index.html')) return undefined;
  return `/${file.slice(0, -'/index.html'.length)}`;
}

export function getSiteRoute(pathname: string): SiteRoute {
  const normalizedPathname = pathname === '/' ? pathname : pathname.replace(/\/+$/, '');

  return siteRoutes.find((route) => route.path === normalizedPathname) ?? notFoundRoute;
}
