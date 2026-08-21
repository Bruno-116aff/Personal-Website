export const caseStudyConfidentialityNote =
  'Internal business system. Some implementation details and identifiers have been generalized due to confidentiality obligations.';

export type CaseStudyPath =
  | '/work/infrastructure-reliability'
  | '/work/operations-automation'
  | '/work/unified-platform'
  | '/work/account-automation';

export type CaseStudyArchitectureStep = {
  label: string;
  description: string;
};

export type CaseStudyResult = {
  value: string;
  label: string;
  detail?: string;
};

export type CaseStudy = {
  path: CaseStudyPath;
  title: string;
  summary: string;
  context: readonly string[];
  problem: readonly string[];
  constraints: string;
  approach: readonly string[];
  architecture: readonly CaseStudyArchitectureStep[];
  technologies: readonly string[];
  results: readonly CaseStudyResult[];
  engineeringLessons: readonly string[];
};

export type CaseStudyRoute = {
  path: CaseStudyPath;
  title: string;
};

export const caseStudyRoutes: readonly CaseStudyRoute[] = [
  { path: '/work/infrastructure-reliability', title: 'Infrastructure Reliability' },
  { path: '/work/operations-automation', title: 'Operations Automation' },
  { path: '/work/unified-platform', title: 'Unified Platform' },
  { path: '/work/account-automation', title: 'Account Automation' },
];

const infrastructureReliabilityCase: CaseStudy = {
  path: '/work/infrastructure-reliability',
  title: 'Infrastructure Reliability',
  summary:
    'A hardware-aware worker service that made a 20-modem proxy station more reliable and reduced direct proxy line-item costs by roughly $3.5K per year.',
  context: [
    'PS Simple Traffic relied on mobile proxies for internal use, partner access and limited resale. Third-party proxy lines were expensive and frequently unstable.',
  ],
  problem: [
    'Connection drops created recurring operational work. A failed modem or proxy could interrupt traffic, while adding a new modem required manual configuration and the underlying network state was difficult to see from the central CRM.',
  ],
  constraints: caseStudyConfidentialityNote,
  approach: [
    'The system treated physical components as expected points of failure. A dedicated worker on Ubuntu owned modem and network state, remotely reset IPs when needed, configured newly inserted modems and reported live status to the CRM.',
    'External endpoints stayed abstracted behind a tunnel and static IP. When a modem failed, the worker rerouted traffic to another available modem instead of leaving users on a failed connection.',
    'The rollout also introduced private network access controls to reduce internal exposure without changing the external endpoint experience.',
  ],
  architecture: [
    {
      label: 'CRM configuration',
      description: 'Supplies management configuration and receives live worker status.',
    },
    {
      label: 'Ubuntu worker',
      description: 'Controls ports and network state, configures new modems and performs remote IP resets.',
    },
    {
      label: 'Modem station',
      description: 'A hub of USB modems connected through SIM cards and rooftop antennas.',
    },
    {
      label: 'Tunnel and static IP',
      description: 'Expose domain-based endpoints while keeping the underlying routing abstracted.',
    },
    {
      label: 'Failover',
      description: 'Reroutes traffic to another modem when a connection fails and reports the new state to the CRM.',
    },
  ],
  technologies: ['Ubuntu', 'Worker service', 'USB modems', 'Tunnels', 'Static IP', 'CRM integration'],
  results: [
    {
      value: '~$3.5K/year',
      label: 'Direct proxy line-item savings',
      detail: 'Verified cost reduction',
    },
    {
      value: '20',
      label: 'Physical modems',
      detail: 'Up to 3 concurrent users per proxy',
    },
    {
      value: 'Zero',
      label: 'Proxy-related outages since deployment',
      detail: 'Recurring third-party-provider failures removed',
    },
  ],
  engineeringLessons: [
    'Most of the difficulty was accepting that physical hardware fails in ways no cloud abstraction prepares you for. Failover only became reliable once every component was treated as something that would eventually go down.',
    'Today, I would introduce structured health-check telemetry from day one instead of adding it after the first unexplained outage.',
  ],
};

const operationsAutomationCase: CaseStudy = {
  path: '/work/operations-automation',
  title: 'Operations Automation',
  summary:
    'A queued provisioning pipeline that reduced a server-and-domain request from 1–3 hours to around 15 minutes and removed a manual operational bottleneck.',
  context: [
    'Operators regularly needed a test deployment in a specific location, with a server, domain and traffic flow configured for the request. Each request previously moved through a manual checklist.',
  ],
  problem: [
    'Provisioning required someone to create a server, connect a domain, configure the flow and verify access by hand. The work took time, was prone to manual errors and depended on a dedicated operational role.',
  ],
  constraints: caseStudyConfidentialityNote,
  approach: [
    'The manual checklist became an asynchronous pipeline. Each request was validated first, then split into independent steps so a failed sub-task could be retried without restarting completed work.',
    'Provisioning and domain work could run in parallel, while a separate service verified the configured destination before the request was marked complete. This made the workflow recoverable instead of treating it as one long operation.',
  ],
  architecture: [
    {
      label: 'CRM request',
      description: 'An operator selects the product and location, then submits a provisioning request.',
    },
    {
      label: 'Validation',
      description: 'A worker checks required access and prerequisites through APIs before provisioning begins.',
    },
    {
      label: 'RabbitMQ queue',
      description: 'Carries the validated job and separates the workflow into independently retryable tasks.',
    },
    {
      label: 'Parallel provisioning',
      description: 'Workers create the server through cloud-provider APIs, deploy configuration and content, and select, attach and secure an available domain.',
    },
    {
      label: 'Verification',
      description: 'A separate service configures the required flow in an internal tracking system and checks that the destination endpoint is reachable.',
    },
    {
      label: 'Completion notification',
      description: 'After verification succeeds, a notification service confirms the completed request in Telegram.',
    },
  ],
  technologies: ['RabbitMQ', 'AWS', 'DigitalOcean', 'Cloudflare', 'TLS', 'SSH', 'Telegram'],
  results: [
    {
      value: '1–3h → ~15m',
      label: 'Provisioning request time',
      detail: 'From manual checklist to automated pipeline',
    },
    {
      value: '~$7K/year',
      label: 'Direct operational savings',
      detail: 'Dedicated manual operational role removed',
    },
    {
      value: 'Near-zero',
      label: 'Manual processing errors',
      detail: 'After automation',
    },
  ],
  engineeringLessons: [
    'The hard part was decomposing one manual checklist into independently retryable steps. Early versions treated the flow as one unit, so one failed sub-task could force the whole request to be redone.',
    'Today, I would design idempotent, independently resumable steps from the start rather than arriving at that model after painful reruns.',
  ],
};

const unifiedPlatformCase: CaseStudy = {
  path: '/work/unified-platform',
  title: 'Unified Platform',
  summary:
    'A single operational platform that consolidated fragmented systems, reconciled delivery, traffic and spend, and evolved from a modular monolith as the scope grew.',
  context: [
    'Company tooling was fragmented across account management, traffic configuration, payments and domains. Orders arrived through Telegram without a central record, and teams had to cross-reference separate systems to understand operations.',
  ],
  problem: [
    'There was no shared operational view of what an ad platform reported, what reached the destination and what was spent in the payment system. Access changes and risk responses also required work across multiple tools.',
  ],
  constraints: caseStudyConfidentialityNote,
  approach: [
    'The first priority was a single operational source of truth. The platform brought the existing workflows together and made cross-system reconciliation a first-class capability instead of a manual comparison.',
    'The original Node.js and Express modular monolith was appropriate while the scope was small. As responsibilities and integration boundaries grew, the system was rewritten with NestJS microservices so services could evolve around clearer operational responsibilities.',
    'Supporting capabilities stayed inside the platform: API-based domain management, task automation triggers, financial report export and a short-link and domain redirect service.',
  ],
  architecture: [
    {
      label: 'Operational platform',
      description: 'Centralizes previously separate account, traffic, payment and domain workflows.',
    },
    {
      label: 'Reconciliation',
      description: 'Compares reported delivery, actual traffic reaching the destination and payment-system spend in one operational view.',
    },
    {
      label: 'Initial architecture',
      description: 'A Node.js and Express modular monolith kept the early system simple while the scope was still contained.',
    },
    {
      label: 'Service evolution',
      description: 'A NestJS microservices architecture introduced clearer boundaries as the platform and its integrations grew.',
    },
    {
      label: 'Operational controls',
      description: 'Centralized team onboarding and offboarding, plus a single control to halt traffic and accounts in a risk scenario.',
    },
    {
      label: 'Supporting systems',
      description: 'Adds domain management by API, automated task triggers, financial report export, and short-link and redirect capabilities.',
    },
  ],
  technologies: ['Node.js', 'Express', 'NestJS', 'Microservices', 'REST APIs', 'Domain APIs'],
  results: [
    {
      value: 'One platform',
      label: 'Operational view',
      detail: 'Replaces fragmented workflows and manual cross-checks',
    },
    {
      value: 'Faster',
      label: 'Incident response',
      detail: 'Centralized operational control',
    },
    {
      value: 'One action',
      label: 'Access and risk controls',
      detail: 'Team access changes and company-wide traffic halt',
    },
  ],
  engineeringLessons: [
    'The original monolith was the right choice while the scope was small. The harder decision was recognizing when growing internal coupling made the next stage of the system more expensive to change.',
    'Today, I would introduce clearer service boundaries earlier, before the monolith’s internal coupling made the eventual split more expensive than it needed to be.',
  ],
};

const accountAutomationCase: CaseStudy = {
  path: '/work/account-automation',
  title: 'Account Automation',
  summary:
    'A lifecycle-management system for a large pool of operational accounts, combining scheduling under fixed execution capacity, health monitoring and synchronized state.',
  context: [
    'A large pool of operational accounts needed consistent lifecycle management. Processing capacity was fixed, while every entity needed a minimum amount of processing within a rolling window.',
  ],
  problem: [
    'Manual and automated processes had to maintain a shared view of account state. Without a scheduling model, finite execution capacity could leave entities outside their required processing window, while risk signals could go unaddressed.',
  ],
  constraints: caseStudyConfidentialityNote,
  approach: [
    'The scheduling problem came first: a fixed number of concurrent execution slots had to serve a much larger pool fairly over time. Persisted state made it possible to choose the next eligible entity and preserve progress across interruptions.',
    'Health monitoring and state synchronization kept manual and automated work aligned. An anomaly-detection circuit breaker added a fail-safe that halts spend within minutes when a controlled process starts trending into loss.',
    'The same platform also automated budget request, approval and funding workflows, plus templated bulk operations with automatic eligibility selection.',
  ],
  architecture: [
    {
      label: 'Lifecycle state',
      description: 'Stores the current processing state for every operational account.',
    },
    {
      label: 'Scheduler',
      description: 'Selects eligible entities so a large pool can be served within the required rolling window.',
    },
    {
      label: 'Execution capacity',
      description: 'Uses a fixed number of concurrent slots as the resource constraint for scheduling decisions.',
    },
    {
      label: 'State synchronization',
      description: 'Keeps manual and automated work represented in one shared lifecycle state.',
    },
    {
      label: 'Health monitoring',
      description: 'Detects anomalies and triggers a fail-safe that halts spend when a controlled process trends into loss.',
    },
    {
      label: 'Operational workflows',
      description: 'Automates budget request, approval and funding steps, plus templated bulk operations with automatic eligibility selection.',
    },
  ],
  technologies: ['RabbitMQ', 'MySQL', 'Redis', 'Scheduling', 'Health monitoring', 'State synchronization'],
  results: [
    {
      value: 'Shared state',
      label: 'Lifecycle management',
      detail: 'Manual and automated work stay synchronized',
    },
    {
      value: 'Within minutes',
      label: 'Fail-safe response',
      detail: 'Spend halts when a controlled process trends into loss',
    },
    {
      value: 'Automated',
      label: 'Budget and bulk workflows',
      detail: 'Approval, funding and eligibility selection',
    },
  ],
  engineeringLessons: [
    'The hardest constraint was resource scarcity: a fixed number of concurrent execution slots had to serve a much larger pool reliably. The scheduling algorithm, rather than the automation itself, became the central engineering problem.',
    'Today, I would model the scheduling constraint mathematically before writing automation code instead of discovering the capacity ceiling empirically.',
  ],
};

// Case-specific copy is added incrementally by SITE-031 through SITE-034.
// Keeping it separate from the route layout avoids duplicated presentation code.
export const caseStudies: readonly CaseStudy[] = [
  infrastructureReliabilityCase,
  operationsAutomationCase,
  unifiedPlatformCase,
  accountAutomationCase,
];

export function getCaseStudy(pathname: string) {
  return caseStudies.find((caseStudy) => caseStudy.path === pathname);
}

// A complete, non-public fixture used to verify the layout before case copy is
// authored. It contains no claims about Ivan or a client system.
export const caseStudyFixture: CaseStudy = {
  path: '/work/infrastructure-reliability',
  title: 'Case Study Template',
  summary: 'A structured fixture for verifying the reusable case-study layout.',
  context: ['A workflow needed a clear, maintainable case-study presentation.'],
  problem: ['The presentation needed one consistent structure across several routes.'],
  constraints: caseStudyConfidentialityNote,
  approach: ['The layout accepts structured content so each route can focus on factual copy.'],
  architecture: [
    { label: 'Content', description: 'Structured case data supplies each section.' },
    { label: 'Layout', description: 'One semantic component renders the shared flow.' },
  ],
  technologies: ['React', 'TypeScript'],
  results: [{ value: '1', label: 'Reusable layout', detail: 'Shared across case routes' }],
  engineeringLessons: ['Keep factual content independent from presentation so it can be reviewed safely.'],
};
