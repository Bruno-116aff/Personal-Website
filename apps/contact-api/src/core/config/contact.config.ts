export type ContactConfig = {
  allowedOrigin: string;
  databasePath: string;
  port: number;
  rateLimit: {
    maxRequests: number;
    windowMs: number;
  };
};

export const CONTACT_CONFIG = Symbol('CONTACT_CONFIG');

function required(environment: NodeJS.ProcessEnv, name: string) {
  const value = environment[name]?.trim();

  if (!value) {
    throw new Error(`Missing required server configuration: ${name}`);
  }

  return value;
}

function positiveInteger(value: string | undefined, fallback: number, name: string) {
  if (value === undefined || value === '') {
    return fallback;
  }

  const parsed = Number(value);
  if (!Number.isInteger(parsed) || parsed < 1) {
    throw new Error(`Invalid server configuration: ${name}`);
  }

  return parsed;
}

export function createContactConfig(environment: NodeJS.ProcessEnv = process.env): ContactConfig {
  return {
    allowedOrigin: required(environment, 'CONTACT_ALLOWED_ORIGIN'),
    databasePath: environment.CONTACT_DATABASE_PATH?.trim() || './data/contact.sqlite',
    port: positiveInteger(environment.CONTACT_API_PORT, 3001, 'CONTACT_API_PORT'),
    rateLimit: {
      maxRequests: positiveInteger(environment.CONTACT_RATE_LIMIT_MAX_REQUESTS, 5, 'CONTACT_RATE_LIMIT_MAX_REQUESTS'),
      windowMs: positiveInteger(environment.CONTACT_RATE_LIMIT_WINDOW_SECONDS, 60, 'CONTACT_RATE_LIMIT_WINDOW_SECONDS') * 1_000,
    },
  };
}
