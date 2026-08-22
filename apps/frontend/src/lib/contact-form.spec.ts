import assert from 'node:assert/strict';
import { describe, it } from 'node:test';

import {
  createContactSubmissionLock,
  getContactApiUrl,
  submitContactRequest,
  validateContactSubmission,
} from './contact-form.js';

describe('contact form configuration', () => {
  it('uses a configured endpoint and treats a blank value as unavailable', () => {
    assert.equal(getContactApiUrl(' https://api.example.test/contact '), 'https://api.example.test/contact');
    assert.equal(getContactApiUrl('   '), null);
  });
});

describe('contact form validation', () => {
  it('accepts a complete, bounded submission', () => {
    assert.deepEqual(validateContactSubmission({
      name: 'Ada Lovelace',
      email: 'ada@example.test',
      message: 'I would like to discuss a role.',
      website: '',
    }), {});
  });

  it('reports errors without exposing server implementation details', () => {
    assert.deepEqual(validateContactSubmission({
      name: '',
      email: 'not-an-email',
      message: '',
      website: '',
    }), {
      name: 'Enter a name of up to 100 characters.',
      email: 'Enter a valid email address.',
      message: 'Enter a message of up to 5,000 characters.',
    });
  });
});

describe('contact request behavior', () => {
  const payload = {
    name: 'Ada Lovelace',
    email: 'ada@example.test',
    message: 'I would like to discuss a role.',
    website: '',
  };

  it('aborts a stalled request at the configured timeout', async () => {
    let requestSignal: AbortSignal | undefined;
    const fetchImpl: typeof fetch = async (_input, init) => new Promise<Response>((_resolve, reject) => {
      requestSignal = init?.signal ?? undefined;
      init?.signal?.addEventListener('abort', () => reject(new Error('request aborted')), { once: true });
    });

    await assert.rejects(
      submitContactRequest('https://api.example.test/contact', payload, { fetchImpl, timeoutMs: 5 }),
      { message: 'request aborted' },
    );
    assert.equal(requestSignal?.aborted, true);
  });

  it('converts an API failure into a generic safe error', async () => {
    const fetchImpl: typeof fetch = async () => ({ ok: false } as Response);

    await assert.rejects(
      submitContactRequest('https://api.example.test/contact', payload, { fetchImpl }),
      { message: 'Contact submission failed.' },
    );
  });

  it('accepts only the documented API response', async () => {
    const fetchImpl: typeof fetch = async () => new Response(
      JSON.stringify({ status: 'accepted' }),
      { status: 201, headers: { 'Content-Type': 'application/json' } },
    );

    await assert.doesNotReject(() => submitContactRequest(
      'https://api.example.test/contact',
      payload,
      { fetchImpl },
    ));

    const unexpectedResponse: typeof fetch = async () => new Response(null, { status: 204 });
    await assert.rejects(
      submitContactRequest('https://api.example.test/contact', payload, { fetchImpl: unexpectedResponse }),
      { message: 'Contact submission failed.' },
    );
  });

  it('allows only one in-flight request and releases for retry', () => {
    const lock = createContactSubmissionLock();

    assert.equal(lock.acquire(), true);
    assert.equal(lock.acquire(), false);
    lock.release();
    assert.equal(lock.acquire(), true);
  });
});
