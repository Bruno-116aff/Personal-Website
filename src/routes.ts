export type SiteRoute = {
  path: string;
  heading: string;
  summary: string;
};

export const siteRoutes: readonly SiteRoute[] = [
  {
    path: '/',
    heading: 'Ivan Hubko',
    summary: 'Senior Backend Engineer & Tech Lead',
  },
  {
    path: '/work/infrastructure-reliability',
    heading: 'Infrastructure Reliability',
    summary: 'Case study',
  },
  {
    path: '/work/operations-automation',
    heading: 'Operations Automation',
    summary: 'Case study',
  },
  {
    path: '/work/unified-platform',
    heading: 'Unified Platform',
    summary: 'Case study',
  },
  {
    path: '/work/account-automation',
    heading: 'Account Automation',
    summary: 'Case study',
  },
  {
    path: '/cv',
    heading: 'Curriculum Vitae',
    summary: 'Ivan Hubko — Senior Backend Engineer & Tech Lead',
  },
];

export function getSiteRoute(pathname: string): SiteRoute {
  const normalizedPathname = pathname === '/' ? pathname : pathname.replace(/\/+$/, '');

  return siteRoutes.find((route) => route.path === normalizedPathname) ?? siteRoutes[0];
}
