export type HomeMetric = {
  value: string;
  label: string;
  detail: string;
};

export type WorkTeaser = {
  title: string;
  summary: string;
  href: string;
  linkLabel: string;
  tags: readonly string[];
  quiet?: boolean;
};

export const homeHero = {
  eyebrow: 'Senior Backend Engineer & Tech Lead',
  title: 'I build backend systems that replace manual work with reliable automation.',
  summary:
    'I design and build Node.js and TypeScript systems, integrations and automation for business-critical workflows.',
  tags: ['Node.js', 'TypeScript', 'Limassol, Cyprus', 'Open to remote / hybrid / relocation'],
};

export const homeMetrics: readonly HomeMetric[] = [
  {
    value: '5 yrs',
    label: 'Commercial experience',
    detail: '3+ years backend-focused',
  },
  {
    value: '8',
    label: 'Peak team led',
    detail: 'Developers',
  },
  {
    value: '1–3h → ~15m',
    label: 'Provisioning request',
    detail: 'Operations Automation',
  },
  {
    value: '~$3.5K/yr',
    label: 'Direct cost reduction',
    detail: 'Proxy line item',
  },
];

export const homeCapabilities = [
  {
    title: 'Backend systems',
    summary: 'Node.js and TypeScript services, APIs, workers and integrations for business-critical workflows.',
    tags: ['Node.js', 'TypeScript', 'APIs'],
  },
  {
    title: 'Automation',
    summary: 'Queues, schedulers and worker processes that turn manual operations into recoverable pipelines.',
    tags: ['Queues', 'Workers', 'Integrations'],
  },
  {
    title: 'Production ownership',
    summary: 'Architecture, deployment and failure handling from the first system decision through production.',
    tags: ['Architecture', 'Reliability', 'Deployment'],
  },
] as const;

export const featuredWork: readonly WorkTeaser[] = [
  {
    title: 'Infrastructure Reliability',
    summary:
      'A worker service for a 20-modem proxy station that rerouted failed connections and reduced direct proxy line-item cost by roughly $3.5K per year.',
    href: '/work/infrastructure-reliability',
    linkLabel: 'Read the infrastructure reliability case study',
    tags: ['Workers', 'Ubuntu', 'Failover'],
  },
  {
    title: 'Operations Automation',
    summary:
      'A queued provisioning pipeline that reduced a server-and-domain request from 1–3 hours to around 15 minutes.',
    href: '/work/operations-automation',
    linkLabel: 'Read the operations automation case study',
    tags: ['RabbitMQ', 'Cloud APIs', 'TLS'],
  },
  {
    title: 'Unified Platform',
    summary:
      'A single operational platform that reconciled reported delivery, actual traffic and spend across previously fragmented systems.',
    href: '/work/unified-platform',
    linkLabel: 'Read the unified platform case study',
    tags: ['NestJS', 'Microservices', 'Reconciliation'],
  },
  {
    title: 'Account Automation',
    summary:
      'Lifecycle management for a large pool of operational accounts, with scheduling under fixed hardware limits, health monitoring and synchronized state.',
    href: '/work/account-automation',
    linkLabel: 'Read the account automation case study',
    tags: ['Scheduling', 'Health monitoring', 'State sync'],
    quiet: true,
  },
];
