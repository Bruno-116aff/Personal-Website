import assert from 'node:assert/strict';
import test from 'node:test';

import { featuredWork } from './content/home';
import { caseStudyRoutes } from './content/case-studies';
import { getMetadataForRoute } from './lib/metadata';
import { getSiteRoute, notFoundRoute, publicSiteRoutes, routeHtmlPath, siteRoutes } from './routes';

const approvedPublicPaths = [
  '/',
  '/work/infrastructure-reliability',
  '/work/operations-automation',
  '/work/unified-platform',
  '/work/account-automation',
  '/cv',
];

test('public route manifest contains exactly the approved public routes', () => {
  assert.deepEqual(
    publicSiteRoutes.map((route) => route.path),
    approvedPublicPaths,
  );
  assert.equal(new Set(siteRoutes.map((route) => route.path)).size, siteRoutes.length);
  assert.equal(
    new Set(publicSiteRoutes.map((route) => route.titleKey)).size,
    publicSiteRoutes.length,
  );
});

test('public route manifest has metadata and generated file paths for every route', () => {
  for (const route of publicSiteRoutes) {
    const metadata = getMetadataForRoute(route);
    assert.equal(metadata.path, route.path);
    if (route.kind !== 'home') assert.ok(metadata.title.startsWith(route.heading));
    assert.match(routeHtmlPath(route), /(?:^index\.html$|\/index\.html$)/);
  }
});

test('case-study navigation and homepage work use the public route manifest', () => {
  const manifestCaseStudies = publicSiteRoutes.filter((route) => route.kind === 'case-study');

  assert.deepEqual(
    caseStudyRoutes.map(({ path, title, titleKey }) => ({ path, title, titleKey })),
    manifestCaseStudies.map(({ path, heading: title, titleKey }) => ({ path, title, titleKey })),
  );
  assert.deepEqual(
    featuredWork.map(({ href, title }) => ({ href, title })),
    manifestCaseStudies.map(({ path: href, heading: title }) => ({ href, title })),
  );
});

test('unknown paths resolve to the non-public not-found route', () => {
  assert.equal(getSiteRoute('/does-not-exist').kind, 'not-found');
  assert.equal(getSiteRoute('/does-not-exist/').titleKey, 'notFound');
  assert.equal(notFoundRoute.public, false);
});
