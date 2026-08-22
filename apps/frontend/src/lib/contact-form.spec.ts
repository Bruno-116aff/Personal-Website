import assert from 'node:assert/strict';
import { describe, it } from 'node:test';

import { getContactApiUrl, validateContactSubmission } from './contact-form.js';

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
