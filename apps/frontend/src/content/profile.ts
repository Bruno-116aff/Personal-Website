export type CareerFact = {
  period: string;
  company: string;
  role: string;
  summary: string;
};

export const careerFacts: readonly CareerFact[] = [
  {
    period: 'Sep 2021 – Feb 2022',
    company: 'Fiverr / Upwork',
    role: 'Frontend Web Developer, freelance',
    summary: 'First commercial experience building landing pages with JavaScript, HTML and CSS.',
  },
  {
    period: 'Mar 2022 – Mar 2023',
    company: 'Alpha Tech',
    role: 'Full Stack Developer, remote',
    summary: 'Frontend-heavy work with server-side, API and database responsibilities using PHP and JavaScript.',
  },
  {
    period: 'Mar 2023 – Sep 2023',
    company: 'PS Simple Traffic',
    role: 'Frontend Developer',
    summary: 'Built internal React and TypeScript applications while expanding into backend and infrastructure work as the team grew.',
  },
  {
    period: 'Oct 2023 – Dec 2024',
    company: 'PS Simple Traffic',
    role: 'Backend Developer / Team Lead',
    summary: 'Shifted primary focus to backend, led a frontend team of 3, co-built core platform architecture and took ownership of deployment and infrastructure.',
  },
  {
    period: '2025 – present',
    company: 'PS Simple Traffic',
    role: 'Tech Lead / Senior Backend Developer',
    summary: 'Owns backend technical direction and architecture decisions, supported team growth to a peak of 8 developers, and remains hands-on in code.',
  },
];

export const skillFacts = {
  languages: ['TypeScript', 'JavaScript (ES6+)', 'SQL', 'PHP'],
  backend: ['Node.js', 'Express.js', 'NestJS', 'REST APIs', 'WebSocket', 'Webhooks', 'Background processing', 'Schedulers', 'Worker processes'],
  architecture: ['System design', 'Modular monoliths', 'Microservices', 'Service-oriented architecture', 'Event-driven architecture', 'Controller-service-repository pattern', 'BullMQ', 'Redis queues', 'Kafka', 'RabbitMQ', 'Retries', 'Failure handling', 'Persisted processing state'],
  dataReliability: ['MySQL', 'PostgreSQL', 'Redis', 'Schema design', 'Transactions', 'Query optimization', 'Indexing', 'Caching', 'Structured logging', 'Monitoring', 'Health checks', 'Failure recovery', 'Production troubleshooting'],
  integrations: ['Third-party APIs', 'Meta / Facebook Graph API', 'Cloudflare API', 'Payment and financial APIs', 'Telegram integrations'],
  security: ['JWT', 'Access / refresh tokens', 'httpOnly cookies', 'Session management', 'RBAC', 'CORS', 'TLS / HTTPS', 'API validation'],
  cloudDelivery: ['AWS', 'Google Cloud', 'Cloudflare', 'Docker', 'Docker Compose', 'Linux / Ubuntu', 'Nginx', 'Apache2', 'Traefik', 'PM2', 'Portainer', 'Reverse proxies', 'DNS', 'GitHub Actions', 'Automated deployment', 'Git'],
  frontend: ['React', 'Vite', 'MUI', 'HTML5 / CSS3'],
  aiAssisted: ['Cursor', 'Claude Code', 'OpenAI Codex'],
} as const;
