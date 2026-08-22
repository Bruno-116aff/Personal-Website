import { caseStudies, type CaseStudyTitleKey } from './case-studies';

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

export type EngineeringApproachPoint = {
  title: string;
  summary: string;
};

export const engineeringApproach = {
  description: 'A practical way to move from a manual workflow to a system that can be trusted in production.',
  points: [
    {
      title: 'Start with the manual failure',
      summary: 'Identify the slow, unreliable or repetitive part of the workflow before choosing the architecture around it.',
    },
    {
      title: 'Make failure recoverable',
      summary: 'Use independent steps, persisted state and retries so a failed process can resume instead of starting over.',
    },
    {
      title: 'Keep trade-offs explicit',
      summary: 'Choose the smallest architecture that fits the current scope, then make the cost of change visible as the system grows.',
    },
    {
      title: 'Own the production path',
      summary: 'Treat deployment, health checks, monitoring and failure handling as part of the system rather than a handoff after coding.',
    },
  ] as const satisfies readonly EngineeringApproachPoint[],
};

const workPresentation: Record<CaseStudyTitleKey, Omit<WorkTeaser, 'title' | 'href'>> = {
  infrastructureReliability: {
    summary:
      'A worker service for a 20-modem proxy station that rerouted failed connections and reduced direct proxy line-item cost by roughly $3.5K per year.',
    linkLabel: 'Read the infrastructure reliability case study',
    tags: ['Workers', 'Ubuntu', 'Failover'],
  },
  operationsAutomation: {
    summary:
      'A queued provisioning pipeline that reduced a server-and-domain request from 1–3 hours to around 15 minutes.',
    linkLabel: 'Read the operations automation case study',
    tags: ['RabbitMQ', 'Cloud APIs', 'TLS'],
  },
  unifiedPlatform: {
    summary:
      'A single operational platform that reconciled reported delivery, actual traffic and spend across previously fragmented systems.',
    linkLabel: 'Read the unified platform case study',
    tags: ['NestJS', 'Microservices', 'Reconciliation'],
  },
  accountAutomation: {
    summary:
      'Lifecycle management for a large pool of operational accounts, with scheduling under fixed hardware limits, health monitoring and synchronized state.',
    linkLabel: 'Read the account automation case study',
    tags: ['Scheduling', 'Health monitoring', 'State sync'],
    quiet: true,
  },
};

export const featuredWork: readonly WorkTeaser[] = caseStudies.map((caseStudy) => ({
  title: caseStudy.title,
  href: caseStudy.path,
  ...workPresentation[caseStudy.titleKey],
}));
