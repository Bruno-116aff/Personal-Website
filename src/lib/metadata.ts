import type { SiteRoute } from '../routes';

const siteOrigin = 'https://ivan.hubko.me';
const approvedLinkedInUrl = 'https://www.linkedin.com/in/ivan-hubko-5a635b245';

export type RouteMetadata = {
  path: string;
  title: string;
  description: string;
  canonicalUrl: string;
  ogType: 'website' | 'article';
  shareImagePath: string;
};

type StructuredData = Record<string, unknown>;

export type MetadataConfig = {
  githubUrl?: string;
  linkedInUrl?: string;
};

const routeMetadata: Record<string, Omit<RouteMetadata, 'path' | 'canonicalUrl'>> = {
  '/': {
    title: 'Ivan Hubko — Senior Backend Engineer & Tech Lead',
    description: 'Ivan Hubko — Senior Backend Engineer & Tech Lead.',
    ogType: 'website',
    shareImagePath: '/images/share/ivan-hubko.png',
  },
  '/work/infrastructure-reliability': {
    title: 'Infrastructure Reliability — Ivan Hubko',
    description: 'Infrastructure Reliability case study by Ivan Hubko.',
    ogType: 'article',
    shareImagePath: '/images/share/infrastructure-reliability.png',
  },
  '/work/operations-automation': {
    title: 'Operations Automation — Ivan Hubko',
    description: 'Operations Automation case study by Ivan Hubko.',
    ogType: 'article',
    shareImagePath: '/images/share/operations-automation.png',
  },
  '/work/unified-platform': {
    title: 'Unified Platform — Ivan Hubko',
    description: 'Unified Platform case study by Ivan Hubko.',
    ogType: 'article',
    shareImagePath: '/images/share/unified-platform.png',
  },
  '/work/account-automation': {
    title: 'Account Automation — Ivan Hubko',
    description: 'Account Automation case study by Ivan Hubko.',
    ogType: 'article',
    shareImagePath: '/images/share/account-automation.png',
  },
  '/cv': {
    title: 'Curriculum Vitae — Ivan Hubko',
    description: 'Curriculum Vitae for Ivan Hubko, Senior Backend Engineer & Tech Lead.',
    ogType: 'website',
    shareImagePath: '/images/share/curriculum-vitae.png',
  },
};

function configuredValue(value: string | undefined) {
  const trimmed = value?.trim();
  return trimmed ? trimmed : undefined;
}

function configuredSameAs(config: MetadataConfig) {
  return [
    configuredValue(config.linkedInUrl) ?? approvedLinkedInUrl,
    configuredValue(config.githubUrl),
  ].filter((value): value is string => Boolean(value));
}

function htmlAttribute(value: string) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('"', '&quot;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;');
}

function jsonForHtml(value: StructuredData[]) {
  return JSON.stringify(value).replaceAll('<', '\\u003c');
}

export function getRouteMetadata(pathname: string): RouteMetadata {
  const path = routeMetadata[pathname] ? pathname : '/';
  const metadata = routeMetadata[path];

  return {
    path,
    ...metadata,
    canonicalUrl: `${siteOrigin}${path === '/' ? '/' : path}`,
  };
}

export function getStructuredData(
  metadata: RouteMetadata,
  config: MetadataConfig = {},
): StructuredData[] {
  const person: StructuredData = {
    '@type': 'Person',
    name: 'Ivan Hubko',
    url: siteOrigin,
    jobTitle: 'Senior Backend Engineer & Tech Lead',
  };

  if (metadata.path.startsWith('/work/')) {
    return [
      {
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: metadata.title.replace(' — Ivan Hubko', ''),
        url: metadata.canonicalUrl,
        author: person,
        image: `${siteOrigin}${metadata.shareImagePath}`,
      },
    ];
  }

  if (metadata.path !== '/') {
    return [
      {
        '@context': 'https://schema.org',
        '@type': 'WebPage',
        name: metadata.title,
        url: metadata.canonicalUrl,
      },
    ];
  }

  const sameAs = configuredSameAs(config);
  const personWithProfiles: StructuredData = {
    '@context': 'https://schema.org',
    ...person,
  };

  if (sameAs.length > 0) {
    personWithProfiles.sameAs = sameAs;
  }

  return [
    {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: 'Ivan Hubko',
      url: siteOrigin,
    },
    personWithProfiles,
  ];
}

export function renderMetadataHead(
  metadata: RouteMetadata,
  config: MetadataConfig = {},
) {
  const ogImage = `${siteOrigin}${metadata.shareImagePath}`;
  const structuredData = jsonForHtml(getStructuredData(metadata, config));

  return `<!-- site-metadata:start -->
<title>${htmlAttribute(metadata.title)}</title>
<meta name="description" content="${htmlAttribute(metadata.description)}" />
<link rel="canonical" href="${htmlAttribute(metadata.canonicalUrl)}" />
<meta name="robots" content="index, follow" />
<meta property="og:type" content="${metadata.ogType}" />
<meta property="og:title" content="${htmlAttribute(metadata.title)}" />
<meta property="og:description" content="${htmlAttribute(metadata.description)}" />
<meta property="og:url" content="${htmlAttribute(metadata.canonicalUrl)}" />
<meta property="og:image" content="${htmlAttribute(ogImage)}" />
<meta property="og:image:width" content="1200" />
<meta property="og:image:height" content="630" />
<meta property="og:image:type" content="image/png" />
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content="${htmlAttribute(metadata.title)}" />
<meta name="twitter:description" content="${htmlAttribute(metadata.description)}" />
<meta name="twitter:url" content="${htmlAttribute(metadata.canonicalUrl)}" />
<meta name="twitter:image" content="${htmlAttribute(ogImage)}" />
<script type="application/ld+json">${structuredData}</script>
<!-- site-metadata:end -->`;
}

export function getMetadataForRoute(route: SiteRoute) {
  return getRouteMetadata(route.path);
}
