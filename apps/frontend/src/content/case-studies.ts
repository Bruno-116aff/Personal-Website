import { publicSiteRoutes, type SiteRouteTitleKey } from '../routes';

export const caseStudyConfidentialityNote =
  'Internal business system. Some implementation details and identifiers have been generalized due to confidentiality obligations.';

export type CaseStudyTitleKey = Exclude<SiteRouteTitleKey, 'home' | 'cv' | 'notFound'>;

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

type CaseStudyContent = {
  summary: string;
  context: readonly string[];
  problem: readonly string[];
  constraints: string;
  approach: readonly string[];
  architecture: readonly CaseStudyArchitectureStep[];
  technologies: readonly string[];
  results: readonly CaseStudyResult[];
  supportingImpact?: string;
  engineeringLessons: readonly string[];
};

export type CaseStudy = CaseStudyContent & {
  path: CaseStudyPath;
  title: string;
  titleKey: CaseStudyTitleKey;
};

export type CaseStudyRoute = {
  path: CaseStudyPath;
  title: string;
  titleKey: CaseStudyTitleKey;
};

const infrastructureReliabilityCase: CaseStudyContent = {
  summary:
    'Built an internally managed mobile proxy infrastructure around 20 physical modems, removing dependence on unstable third-party providers and introducing automatic failover, centralized control and remote recovery.',
  context: [
    'PS Simple Traffic relied on mobile proxies for internal operations, partner access and limited client use. Third-party proxy lines were expensive and frequently unstable.',
  ],
  problem: [
    'Connection failures repeatedly interrupted operational work. A failed modem or proxy could leave users without service, while replacing or configuring hardware required manual intervention.',
    'The underlying network state also was not visible from the central CRM, which made diagnosis and recovery slower than necessary.',
  ],
  constraints: caseStudyConfidentialityNote,
  approach: [
    'The system was designed around one assumption: every physical component would eventually fail.',
    'A dedicated Ubuntu worker managed modem ports and network state, automatically configured newly connected modems and reported live status to the central CRM.',
    'External endpoints were abstracted behind domain-based access. If one modem became unavailable, traffic could be rerouted to another available modem without exposing the underlying network details to users.',
    'Private network access controls were also introduced to reduce unnecessary exposure of internal systems.',
  ],
  architecture: [
    {
      label: 'Central CRM',
      description: 'Stores configuration and receives live worker and modem state.',
    },
    {
      label: 'Ubuntu Worker',
      description:
        'Controls modem ports and network state, configures newly connected hardware and performs remote IP resets.',
    },
    {
      label: 'Modem Station',
      description: '20 physical USB modems connected through SIM cards and external antennas.',
    },
    {
      label: 'Routing Layer',
      description:
        'Exposes stable domain-based endpoints while keeping the physical network topology hidden from users.',
    },
    {
      label: 'Failover',
      description:
        'Detects unavailable connections and reroutes traffic to another available modem.',
    },
  ],
  technologies: ['Ubuntu', 'Networking', 'USB modems', 'Tunnels', 'Static IP', 'CRM integration'],
  results: [
    {
      value: '20',
      label: 'Physical modems',
      detail: 'Centrally controlled through one worker station.',
    },
    {
      value: 'Automatic',
      label: 'Failover',
      detail: 'Failed connections could be moved to another available modem.',
    },
    {
      value: 'Zero',
      label: 'Proxy-related outages since deployment',
      detail: 'Recurring failures from unstable external providers were removed.',
    },
    {
      value: '~$3.5K/year',
      label: 'Direct proxy line-item savings',
      detail: 'Verified reduction in recurring proxy costs.',
    },
  ],
  engineeringLessons: [
    'The hardest part was accepting that physical hardware fails in ways cloud infrastructure often hides. The design became much simpler once every modem, connection and network component was treated as something that would eventually go down.',
    'If I were starting again, I would introduce structured health telemetry from the first version rather than adding deeper monitoring after the first unexplained failures.',
  ],
};

const operationsAutomationCase: CaseStudyContent = {
  summary:
    'Turned a manual server-and-domain provisioning workflow into an asynchronous pipeline that reduced request completion time from 1–3 hours to approximately 15 minutes.',
  context: [
    'Operators regularly needed short-lived deployments in specific locations, including a server, domain, configuration and a verified destination.',
    'Each request previously moved through a manual checklist.',
  ],
  problem: [
    'A dedicated person had to provision the server, configure access, connect a domain, set up the required internal flow and verify that the final destination was reachable.',
    'The process was slow, depended on one person and created repeated opportunities for manual error.',
  ],
  constraints: caseStudyConfidentialityNote,
  approach: [
    'The manual checklist was decomposed into independently executable steps.',
    'Every request was validated before provisioning started. Tasks that did not depend on each other could run in parallel, while failed sub-tasks could be retried without restarting the complete workflow.',
    'A separate verification step checked that the configured destination was reachable before the request was considered complete.',
    'This changed the workflow from one long manual operation into a recoverable asynchronous pipeline.',
  ],
  architecture: [
    {
      label: 'Request',
      description: 'An operator selects the required product and location in the CRM.',
    },
    {
      label: 'Validation',
      description:
        'Required access and prerequisites are checked through APIs before any infrastructure is created.',
    },
    {
      label: 'RabbitMQ',
      description:
        'The validated request is placed into a queue and separated into independently retryable tasks.',
    },
    {
      label: 'Parallel Provisioning',
      description:
        'Workers provision infrastructure through cloud APIs while another branch selects, attaches and secures an available domain.',
    },
    {
      label: 'Verification',
      description:
        'A separate service configures the required internal flow and verifies that the final destination is reachable.',
    },
    {
      label: 'Completion',
      description: 'A notification service confirms the successful request through Telegram.',
    },
  ],
  technologies: ['RabbitMQ', 'AWS', 'DigitalOcean', 'Cloudflare', 'TLS', 'SSH', 'Telegram'],
  results: [
    {
      value: '1–3h → ~15m',
      label: 'Request completion time',
      detail: 'Manual checklist replaced with automated provisioning.',
    },
    {
      value: '~$7K/year',
      label: 'Direct operational savings',
      detail: 'The dedicated manual operational role was no longer required.',
    },
    {
      value: 'Near-zero',
      label: 'Manual processing errors',
      detail: 'Validation and automated execution removed most human error from the workflow.',
    },
  ],
  engineeringLessons: [
    'The difficult part was not queueing work. It was breaking one manual checklist into steps that could fail and recover independently.',
    'Early versions treated the workflow too much like a single operation. Today I would design every step to be idempotent and independently resumable from the beginning.',
  ],
};

const unifiedPlatformCase: CaseStudyContent = {
  summary:
    'Consolidated fragmented operational systems into one internal platform and evolved the architecture from a modular monolith to clearer service boundaries as the scope grew.',
  context: [
    'Operational tooling was spread across separate systems for account management, traffic configuration, payments and domains. Requests also arrived through Telegram without one central operational record.',
  ],
  problem: [
    'Teams had no shared operational view.',
    'Understanding what an advertising platform reported, what actually reached the destination and what was spent in the payment system required manual comparison across separate tools.',
    'Access management and incident response were fragmented for the same reason.',
  ],
  constraints: caseStudyConfidentialityNote,
  approach: [
    'The first objective was not microservices. It was creating one reliable operational source of truth.',
    'Existing workflows were brought into one platform and cross-system reconciliation became a first-class capability instead of a manual comparison process.',
    'The initial Node.js and Express modular monolith was deliberately kept simple while the product scope was limited.',
    'As integrations and responsibilities grew, the system was moved toward NestJS services with clearer boundaries and more explicit ownership.',
  ],
  architecture: [
    {
      label: 'Operational Platform',
      description:
        'Centralizes previously separate account, traffic, payment and domain workflows.',
    },
    {
      label: 'Reconciliation',
      description:
        'Compares platform-reported delivery, actual traffic reaching the destination and payment-system spend in one operational view.',
    },
    {
      label: 'Initial Architecture',
      description:
        'A Node.js and Express modular monolith kept the early system simple while scope was still contained.',
    },
    {
      label: 'Service Evolution',
      description:
        'NestJS services introduced clearer boundaries as the platform and number of integrations grew.',
    },
    {
      label: 'Operational Controls',
      description:
        'Centralized onboarding and offboarding, along with one-action controls for incident and risk scenarios.',
    },
    {
      label: 'Supporting Systems',
      description:
        'Domain management, automated task triggers, financial report export and short-link/domain redirect capabilities were incorporated into the same operational environment.',
    },
  ],
  technologies: ['Node.js', 'Express.js', 'NestJS', 'Microservices', 'REST APIs', 'Domain APIs'],
  results: [
    {
      value: 'One platform',
      label: 'Operational source of truth',
      detail: 'Previously fragmented workflows became accessible through one internal system.',
    },
    {
      value: 'Cross-system',
      label: 'Reconciliation',
      detail:
        'Delivery, destination traffic and spend could be compared in one view instead of manually across separate tools.',
    },
    {
      value: 'One action',
      label: 'Operational control',
      detail: 'Team access changes and company-wide risk actions became centrally controlled.',
    },
  ],
  supportingImpact:
    'A company-controlled short-link and domain redirect capability also replaced a paid external service, generating approximately $6K/year in combined direct savings and partner revenue.',
  engineeringLessons: [
    'The original monolith was not a mistake. It was the right architecture while the product was small.',
    'The difficult decision was recognizing when growing scope and internal coupling justified stronger service boundaries. Today I would define those boundaries earlier while still avoiding microservices before they provide a concrete benefit.',
  ],
};

const accountAutomationCase: CaseStudyContent = {
  summary:
    'Built lifecycle and scheduling infrastructure for a large pool of operational accounts, combining fixed execution capacity, synchronized state, health monitoring and automated controls.',
  context: [
    'A large pool of operational accounts required continuous lifecycle management while available execution capacity remained fixed.',
    'Every entity needed a minimum amount of processing within a rolling window.',
  ],
  problem: [
    'Manual and automated processes needed to share the same account state.',
    'Without coordinated scheduling, limited execution capacity could leave entities outside the required processing window.',
    'Operational risk also needed to be detected and acted on quickly.',
  ],
  constraints: caseStudyConfidentialityNote,
  approach: [
    'The core engineering problem was resource scheduling rather than automation itself.',
    'A fixed number of concurrent execution slots had to serve a much larger pool fairly over time.',
    'Persisted state made it possible to identify the next eligible entity while preserving progress across interruptions.',
    'Manual and automated activity shared the same lifecycle state, preventing duplicated work.',
    'Health monitoring and a fail-safe could automatically stop a controlled process within minutes when risk conditions were detected.',
    'The same platform also automated approval and funding workflows and supported templated bulk operations with automatic eligibility selection.',
  ],
  architecture: [
    {
      label: 'Lifecycle State',
      description: 'Stores the current processing state for every operational account.',
    },
    {
      label: 'Scheduler',
      description:
        'Selects eligible entities so the larger pool can be served fairly within the required rolling window.',
    },
    {
      label: 'Execution Capacity',
      description: 'Uses a fixed number of concurrent slots as the scheduling constraint.',
    },
    {
      label: 'State Synchronization',
      description: 'Keeps manual and automated activity represented in one shared lifecycle state.',
    },
    {
      label: 'Health Monitoring',
      description:
        'Detects anomalies and triggers a fail-safe when a controlled process moves outside expected conditions.',
    },
    {
      label: 'Operational Workflows',
      description:
        'Automates approval, funding and eligible bulk operations around the same account state.',
    },
  ],
  technologies: ['RabbitMQ', 'MySQL', 'Redis', 'Scheduling', 'State Synchronization'],
  results: [
    {
      value: 'Shared',
      label: 'Lifecycle state',
      detail: 'Manual and automated processes use the same source of account state.',
    },
    {
      value: 'Within minutes',
      label: 'Fail-safe response',
      detail: 'Controlled processes can be halted automatically when risk conditions are detected.',
    },
    {
      value: '~5×',
      label: 'Lower operational account attrition',
      detail:
        'Relative improvement after lifecycle automation and state management were introduced.',
    },
  ],
  engineeringLessons: [
    'The hardest constraint was not the automation logic but resource scarcity. A fixed number of execution slots had to serve a much larger pool reliably.',
    'If I were designing it again, I would model the scheduling constraints formally before implementing the automation instead of discovering capacity limits empirically.',
  ],
};

const caseStudyContent = {
  infrastructureReliability: infrastructureReliabilityCase,
  operationsAutomation: operationsAutomationCase,
  unifiedPlatform: unifiedPlatformCase,
  accountAutomation: accountAutomationCase,
} satisfies Record<CaseStudyTitleKey, CaseStudyContent>;

export const caseStudies: readonly CaseStudy[] = publicSiteRoutes
  .filter((route) => route.kind === 'case-study')
  .map((route) => {
    const titleKey = route.titleKey as CaseStudyTitleKey;

    return {
      ...caseStudyContent[titleKey],
      path: route.path as CaseStudyPath,
      title: route.heading,
      titleKey,
    };
  });

export const caseStudyRoutes: readonly CaseStudyRoute[] = caseStudies.map((caseStudy) => ({
  path: caseStudy.path,
  title: caseStudy.title,
  titleKey: caseStudy.titleKey,
}));

export function getCaseStudy(pathname: string) {
  return caseStudies.find((caseStudy) => caseStudy.path === pathname);
}

// A complete, non-public fixture used to verify the layout before case copy is
// authored. It contains no claims about Ivan or a client system.
export const caseStudyFixture: CaseStudy = {
  path: '/work/infrastructure-reliability',
  title: 'Case Study Template',
  titleKey: 'infrastructureReliability',
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
  engineeringLessons: [
    'Keep factual content independent from presentation so it can be reviewed safely.',
  ],
};
