import { caseStudies, type CaseStudyTitleKey } from './case-studies';

export type HomeMetric = {
  value: string;
  label: string;
  detail: string;
};

export type WorkTeaser = {
  title: string;
  summary: string;
  outcome: string;
  href: string;
  linkLabel: string;
  tags: readonly string[];
  quiet?: boolean;
};

export const homeHero = {
  eyebrow: 'Senior Backend Engineer & Tech Lead',
  title: 'I build backend systems that replace manual work with reliable automation.',
  summary:
    'I design and build Node.js and TypeScript systems for automation, integrations and business-critical workflows — from architecture and implementation to production operation.',
  tags: ['Node.js', 'TypeScript', 'Limassol, Cyprus'],
};

export const homeMetrics: readonly HomeMetric[] = [
  {
    value: '5 yrs',
    label: 'Commercial engineering',
    detail: '3+ years backend-focused',
  },
  {
    value: '8',
    label: 'Developers',
    detail: 'Peak engineering team',
  },
  {
    value: '1–3h → ~15m',
    label: 'Provisioning time',
    detail: 'Manual workflow automated',
  },
  {
    value: '500+',
    label: 'Operational accounts',
    detail: 'Managed through internal systems',
  },
];

export const homeCapabilities = [
  {
    title: 'Backend Systems',
    summary:
      'Design and build Node.js and TypeScript services, APIs, real-time communication, data flows and third-party integrations.',
    tags: ['Node.js', 'TypeScript', 'REST APIs', 'WebSocket'],
  },
  {
    title: 'Automation & Async Processing',
    summary:
      'Turn repetitive workflows into asynchronous systems with queues, workers, scheduling, retries and recoverable failure handling.',
    tags: ['BullMQ', 'RabbitMQ', 'Redis', 'Kafka'],
  },
  {
    title: 'Production Ownership',
    summary:
      'Take responsibility beyond implementation — architecture, deployment, observability, incident investigation and production reliability.',
    tags: ['Docker', 'Linux', 'CI/CD', 'Monitoring'],
  },
] as const;

export type EngineeringApproachPoint = {
  title: string;
  summary: string;
};

export const engineeringApproach = {
  description:
    'The architecture should fit the problem, remain understandable and keep working when external services, infrastructure or individual tasks fail.',
  points: [
    {
      title: 'Start with the manual failure',
      summary:
        'Before choosing technology, identify where the existing process loses time, requires repeated human work or fails unpredictably.',
    },
    {
      title: 'Make failure recoverable',
      summary:
        'Design background work as independently retryable and resumable steps instead of one long operation that must restart from the beginning.',
    },
    {
      title: 'Keep trade-offs explicit',
      summary:
        'Choose the simplest architecture that fits the current scope. Add complexity only when the system has a concrete reason to need it.',
    },
    {
      title: 'Own the production path',
      summary:
        'Treat deployment, observability, incident investigation and failure handling as part of the system rather than work that begins after coding ends.',
    },
  ] as const satisfies readonly EngineeringApproachPoint[],
};

const workPresentation: Record<CaseStudyTitleKey, Omit<WorkTeaser, 'title' | 'href'>> = {
  infrastructureReliability: {
    summary:
      'Built an internally managed proxy infrastructure around 20 physical modems, with centralized control, automatic configuration and failover when a connection became unavailable.',
    outcome: '20 physical modems · automatic failover',
    linkLabel: 'Read the infrastructure reliability case study',
    tags: ['Ubuntu', 'Networking', 'Failover', 'CRM integration'],
  },
  operationsAutomation: {
    summary:
      'Turned a manual server-and-domain provisioning checklist into an asynchronous workflow with validation, parallel execution and recoverable steps.',
    outcome: '1–3h → ~15m per request',
    linkLabel: 'Read the operations automation case study',
    tags: ['RabbitMQ', 'AWS', 'DigitalOcean', 'Cloudflare'],
  },
  unifiedPlatform: {
    summary:
      'Consolidated fragmented operational systems into one platform with cross-system reconciliation, centralized access control and a clearer service architecture as the product grew.',
    outcome: 'Fragmented workflows → one operational platform',
    linkLabel: 'Read the unified platform case study',
    tags: ['Node.js', 'NestJS', 'Microservices', 'REST APIs'],
  },
  accountAutomation: {
    summary:
      'Built lifecycle and scheduling infrastructure for a large pool of operational accounts under fixed execution capacity, with synchronized state, health monitoring and automated controls.',
    outcome: '~5× lower operational account attrition',
    linkLabel: 'Read the account automation case study',
    tags: ['RabbitMQ', 'MySQL', 'Redis', 'Scheduling'],
    quiet: true,
  },
};

export const featuredWork: readonly WorkTeaser[] = caseStudies.map((caseStudy) => ({
  title: caseStudy.title,
  href: caseStudy.path,
  ...workPresentation[caseStudy.titleKey],
}));
