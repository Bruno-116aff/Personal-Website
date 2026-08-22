export const defaultSiteOrigin = 'https://ivan.hubko.me';

export type SiteOriginOptions = {
  allowLocalHttp?: boolean;
};

function isLocalHostname(hostname: string) {
  return hostname === 'localhost'
    || hostname === '127.0.0.1'
    || hostname === '[::1]';
}

export function resolveSiteOrigin(
  value: string | undefined,
  options: SiteOriginOptions = {},
) {
  const configuredValue = value?.trim();
  if (!configuredValue) return defaultSiteOrigin;

  let parsed: URL;
  try {
    parsed = new URL(configuredValue);
  } catch {
    throw new Error('VITE_SITE_URL must be a valid absolute URL.');
  }

  const isLocalHttp = options.allowLocalHttp
    && parsed.protocol === 'http:'
    && isLocalHostname(parsed.hostname);
  if (parsed.protocol !== 'https:' && !isLocalHttp) {
    throw new Error('VITE_SITE_URL must use HTTPS outside local development.');
  }
  if (parsed.username || parsed.password || parsed.pathname !== '/' || parsed.search || parsed.hash) {
    throw new Error('VITE_SITE_URL must contain only the site origin, without credentials, path, query or hash.');
  }

  return parsed.origin;
}
