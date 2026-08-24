export type ContactSubmission = {
  email: string;
  message: string;
  name: string;
  website: string;
};

export type ContactValidationErrors = Partial<Record<keyof ContactSubmission, string>>;

export type ContactRequestErrorCode = 'failed' | 'rate-limited';

export class ContactRequestError extends Error {
  constructor(public readonly code: ContactRequestErrorCode) {
    super(
      code === 'rate-limited' ? 'Contact submission rate limited.' : 'Contact submission failed.',
    );
    this.name = 'ContactRequestError';
  }
}

export const CONTACT_REQUEST_TIMEOUT_MS = 10_000;

type ContactRequestOptions = {
  fetchImpl?: typeof fetch;
  timeoutMs?: number;
};

function isAcceptedResponse(value: unknown): value is { status: 'accepted' } {
  return (
    typeof value === 'object' && value !== null && 'status' in value && value.status === 'accepted'
  );
}

function normalize(value: string) {
  return value.trim();
}

export function getContactApiUrl(configuredValue: string | undefined) {
  const value = configuredValue?.trim();
  if (!value) return null;

  try {
    const url = new URL(value);
    const isLocalHttp =
      url.protocol === 'http:' && ['localhost', '127.0.0.1', '[::1]'].includes(url.hostname);

    if ((url.protocol !== 'https:' && !isLocalHttp) || url.username || url.password) return null;
    return url.href;
  } catch {
    return null;
  }
}

export function toContactSubmission(formData: FormData): ContactSubmission {
  return {
    name: normalize(String(formData.get('name') ?? '')),
    email: normalize(String(formData.get('email') ?? '')).toLowerCase(),
    message: normalize(String(formData.get('message') ?? '')),
    website: normalize(String(formData.get('website') ?? '')),
  };
}

export function validateContactSubmission(values: ContactSubmission): ContactValidationErrors {
  const errors: ContactValidationErrors = {};

  if (!values.name || values.name.length > 100) {
    errors.name = 'Enter a name of up to 100 characters.';
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email) || values.email.length > 254) {
    errors.email = 'Enter a valid email address.';
  }

  if (!values.message || values.message.length > 5_000) {
    errors.message = 'Enter a message of up to 5,000 characters.';
  }

  return errors;
}

export function createContactSubmissionLock() {
  let inFlight = false;

  return {
    acquire() {
      if (inFlight) return false;

      inFlight = true;
      return true;
    },
    release() {
      inFlight = false;
    },
  };
}

export async function submitContactRequest(
  apiUrl: string,
  payload: ContactSubmission,
  options: ContactRequestOptions = {},
) {
  const controller = new AbortController();
  const timeoutId = setTimeout(
    () => controller.abort(),
    options.timeoutMs ?? CONTACT_REQUEST_TIMEOUT_MS,
  );

  try {
    const response = await (options.fetchImpl ?? fetch)(apiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
      signal: controller.signal,
    });

    if (response.status === 429) {
      throw new ContactRequestError('rate-limited');
    }

    if (response.status !== 201) {
      throw new ContactRequestError('failed');
    }

    const responseBody: unknown = await response.json().catch(() => null);
    if (!isAcceptedResponse(responseBody)) {
      throw new ContactRequestError('failed');
    }
  } finally {
    clearTimeout(timeoutId);
  }
}
