import { notFoundRoute, siteRoutes, type SiteRoute, type SiteRouteTitleKey } from '../routes';
import { resolveSiteOrigin } from './site-config';

const approvedLinkedInUrl = 'https://www.linkedin.com/in/ivan-hubko-5a635b245';

export type RouteMetadata = {
  path: string;
  title: string;
  description: string;
  canonicalUrl: string;
  ogType: 'website' | 'article';
  shareImagePath: string;
  shareImageAlt: string;
  robots?: 'index, follow' | 'noindex, follow';
};

type StructuredData = Record<string, unknown>;

export type MetadataConfig = {
  siteOrigin?: string;
  githubUrl?: string;
  linkedInUrl?: string;
};

const routeMetadata: Record<SiteRouteTitleKey, Omit<RouteMetadata, 'path' | 'canonicalUrl' | 'title'>> = {
  home: {
    description:
      'Ivan Hubko is a Senior Backend Engineer & Tech Lead building Node.js and TypeScript systems, integrations and automation for business-critical workflows.',
    ogType: 'website',
    shareImagePath: '/images/share/ivan-hubko.png',
    shareImageAlt: 'Ivan Hubko — Senior Backend Engineer and Tech Lead',
  },
  infrastructureReliability: {
    description:
      'How Ivan Hubko built a hardware-aware worker service for a 20-modem proxy station, adding failover and reducing direct proxy costs by roughly $3.5K per year.',
    ogType: 'article',
    shareImagePath: '/images/share/infrastructure-reliability.png',
    shareImageAlt: 'Infrastructure Reliability case study — Ivan Hubko',
  },
  operationsAutomation: {
    description:
      'How Ivan Hubko turned a manual server-and-domain checklist into a queued provisioning pipeline that reduced requests from 1–3 hours to around 15 minutes.',
    ogType: 'article',
    shareImagePath: '/images/share/operations-automation.png',
    shareImageAlt: 'Operations Automation case study — Ivan Hubko',
  },
  unifiedPlatform: {
    description:
      'How Ivan Hubko unified fragmented operational systems through cross-system reconciliation and a migration from a modular monolith to NestJS microservices.',
    ogType: 'article',
    shareImagePath: '/images/share/unified-platform.png',
    shareImageAlt: 'Unified Platform case study — Ivan Hubko',
  },
  accountAutomation: {
    description:
      'How Ivan Hubko designed lifecycle management for a large pool of operational accounts with fixed-capacity scheduling, health monitoring and synchronized state.',
    ogType: 'article',
    shareImagePath: '/images/share/account-automation.png',
    shareImageAlt: 'Account Automation case study — Ivan Hubko',
  },
  cv: {
    description:
      "Review Ivan Hubko's CV: 5 years of commercial experience, including 3+ years focused on Node.js, TypeScript, backend systems and production ownership.",
    ogType: 'website',
    shareImagePath: '/images/share/curriculum-vitae.png',
    shareImageAlt: 'Ivan Hubko curriculum vitae',
  },
  notFound: {
    description:
      "The page you requested is not part of Ivan Hubko's site map. Return to the homepage, explore selected work or start a conversation.",
    ogType: 'website',
    shareImagePath: '/images/share/ivan-hubko.png',
    shareImageAlt: 'Ivan Hubko — Senior Backend Engineer and Tech Lead',
    robots: 'noindex, follow',
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

export function getRouteMetadata(pathname: string, config: MetadataConfig = {}): RouteMetadata {
  const route = siteRoutes.find((candidate) => candidate.path === pathname) ?? notFoundRoute;
  const metadata = routeMetadata[route.titleKey];
  const siteOrigin = resolveSiteOrigin(config.siteOrigin);

  return {
    path: route.path,
    ...metadata,
    title: route.titleKey === 'home'
      ? 'Ivan Hubko - Senior Backend Engineer & Tech Lead'
      : `${route.heading} - Ivan Hubko`,
    canonicalUrl: `${siteOrigin}${route.path === '/' ? '/' : route.path}`,
  };
}

export function getStructuredData(
  metadata: RouteMetadata,
  config: MetadataConfig = {},
): StructuredData[] {
  const siteOrigin = new URL(metadata.canonicalUrl).origin;
  const personId = `${siteOrigin}/#person`;
  const person: StructuredData = {
    '@type': 'Person',
    '@id': personId,
    name: 'Ivan Hubko',
    url: siteOrigin,
    jobTitle: 'Senior Backend Engineer & Tech Lead',
  };

  if (metadata.path.startsWith('/work/')) {
    return [
      {
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: metadata.title.replace(' - Ivan Hubko', ''),
        url: metadata.canonicalUrl,
        author: person,
        image: `${siteOrigin}${metadata.shareImagePath}`,
        mainEntityOfPage: {
          '@type': 'WebPage',
          '@id': metadata.canonicalUrl,
          url: metadata.canonicalUrl,
        },
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
  const siteOrigin = new URL(metadata.canonicalUrl).origin;
  const ogImage = `${siteOrigin}${metadata.shareImagePath}`;
  const structuredData = jsonForHtml(getStructuredData(metadata, config));

  return `<!-- site-metadata:start -->
<title>${htmlAttribute(metadata.title)}</title>
<meta name="description" content="${htmlAttribute(metadata.description)}" />
<link rel="canonical" href="${htmlAttribute(metadata.canonicalUrl)}" />
<meta name="robots" content="${metadata.robots ?? 'index, follow'}" />
<meta property="og:type" content="${metadata.ogType}" />
<meta property="og:site_name" content="Ivan Hubko" />
<meta property="og:title" content="${htmlAttribute(metadata.title)}" />
<meta property="og:description" content="${htmlAttribute(metadata.description)}" />
<meta property="og:url" content="${htmlAttribute(metadata.canonicalUrl)}" />
<meta property="og:image" content="${htmlAttribute(ogImage)}" />
<meta property="og:image:alt" content="${htmlAttribute(metadata.shareImageAlt)}" />
<meta property="og:image:width" content="1200" />
<meta property="og:image:height" content="630" />
<meta property="og:image:type" content="image/png" />
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content="${htmlAttribute(metadata.title)}" />
<meta name="twitter:description" content="${htmlAttribute(metadata.description)}" />
<meta name="twitter:url" content="${htmlAttribute(metadata.canonicalUrl)}" />
<meta name="twitter:image" content="${htmlAttribute(ogImage)}" />
<meta name="twitter:image:alt" content="${htmlAttribute(metadata.shareImageAlt)}" />
<script type="application/ld+json">${structuredData}</script>
<!-- site-metadata:end -->`;
}

export function getMetadataForRoute(route: SiteRoute, config: MetadataConfig = {}) {
  const metadata = routeMetadata[route.titleKey];
  const siteOrigin = resolveSiteOrigin(config.siteOrigin);

  return {
    path: route.path,
    ...metadata,
    title: route.titleKey === 'home'
      ? 'Ivan Hubko - Senior Backend Engineer & Tech Lead'
      : `${route.heading} - Ivan Hubko`,
    canonicalUrl: `${siteOrigin}${route.path === '/' ? '/' : route.path}`,
  };
}
