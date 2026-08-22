import assert from 'node:assert/strict';
import { describe, it } from 'node:test';

import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';

import { ContactRateLimiter } from './contact-rate-limiter.service.js';
import { ContactRequestDto } from './contact-request.dto.js';
import type { ContactSubmissionStore, NewContactSubmission } from './contact-submission.repository.js';
import { ContactSubmissionService } from './contact-submission.service.js';

class FakeStore implements ContactSubmissionStore {
  saved: NewContactSubmission[] = [];

  save(submission: NewContactSubmission) {
    this.saved.push(submission);
    return this.saved.length;
  }
}

function validRequest(overrides: Partial<ContactRequestDto> = {}): ContactRequestDto {
  return Object.assign(new ContactRequestDto(), {
    name: '  Ada Lovelace  ',
    email: 'ADA@EXAMPLE.COM',
    message: 'Hello\r\nI would like to discuss a role.',
    ...overrides,
  });
}

describe('contact request validation', () => {
  it('rejects malformed email and overlong messages', async () => {
    const request = plainToInstance(ContactRequestDto, {
      name: 'Ada',
      email: 'not-an-email',
      message: 'x'.repeat(5_001),
    });

    const errors = await validate(request);
    assert.equal(errors.length, 2);
  });
});

describe('ContactSubmissionService', () => {
  it('stores sanitized valid submissions and reports accepted', async () => {
    const store = new FakeStore();
    const service = new ContactSubmissionService(store, new ContactRateLimiter({ maxRequests: 2, windowMs: 60_000 }));

    const response = await service.submit(validRequest(), '203.0.113.10');

    assert.deepEqual(response, { status: 'accepted' });
    assert.deepEqual(store.saved, [{
      name: 'Ada Lovelace',
      email: 'ada@example.com',
      message: 'Hello\nI would like to discuss a role.',
    }]);
  });

  it('rejects a populated honeypot without storing a submission', async () => {
    const store = new FakeStore();
    const service = new ContactSubmissionService(store, new ContactRateLimiter({ maxRequests: 2, windowMs: 60_000 }));

    await assert.rejects(() => service.submit(validRequest({ website: 'https://spam.example' }), '203.0.113.11'));
    assert.equal(store.saved.length, 0);
  });

  it('rejects requests above the configured rate limit', async () => {
    const store = new FakeStore();
    const service = new ContactSubmissionService(store, new ContactRateLimiter({ maxRequests: 1, windowMs: 60_000 }));

    await service.submit(validRequest(), '203.0.113.12');
    await assert.rejects(() => service.submit(validRequest(), '203.0.113.12'));
    assert.equal(store.saved.length, 1);
  });

  it('expires and bounds rate-limit records', () => {
    const limiter = new ContactRateLimiter({ maxRequests: 1, maxRecords: 2, windowMs: 1_000 });

    limiter.consume('first', 0);
    assert.throws(() => limiter.consume('first', 0));
    limiter.consume('second', 0);
    limiter.consume('third', 0);

    assert.doesNotThrow(() => limiter.consume('first', 0));
    assert.doesNotThrow(() => limiter.consume('second', 1_000));
  });

});
