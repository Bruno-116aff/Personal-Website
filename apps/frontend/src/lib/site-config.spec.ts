import assert from 'node:assert/strict';
import test from 'node:test';

import { defaultSiteOrigin, resolveSiteOrigin } from './site-config';

test('uses the production origin when VITE_SITE_URL is empty', () => {
  assert.equal(resolveSiteOrigin(undefined), defaultSiteOrigin);
  assert.equal(resolveSiteOrigin('   '), defaultSiteOrigin);
});

test('normalizes a valid HTTPS origin', () => {
  assert.equal(resolveSiteOrigin('https://example.com/'), 'https://example.com');
});

test('allows HTTP only for explicitly enabled localhost development', () => {
  assert.equal(
    resolveSiteOrigin('http://localhost:5173', { allowLocalHttp: true }),
    'http://localhost:5173',
  );
  assert.throws(() => resolveSiteOrigin('http://localhost:5173'));
});

test('rejects malformed and non-HTTPS production origins', () => {
  assert.throws(() => resolveSiteOrigin('not-a-url'), /valid absolute URL/);
  assert.throws(() => resolveSiteOrigin('http://example.com'), /must use HTTPS/);
  assert.throws(() => resolveSiteOrigin('https://example.com/path'), /only the site origin/);
});
