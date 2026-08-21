import assert from 'node:assert/strict';
import { describe, it } from 'node:test';

import { SQLiteContactSubmissionStore } from './contact-submission.repository.js';

describe('SQLiteContactSubmissionStore', () => {
  it('persists a submission in SQLite', () => {
    const store = new SQLiteContactSubmissionStore({
      allowedOrigin: 'https://ivan.hubko.me',
      databasePath: ':memory:',
      port: 3001,
      rateLimit: { maxRequests: 5, windowMs: 60_000 },
    });

    const id = store.save({
      name: 'Ada Lovelace',
      email: 'ada@example.com',
      message: 'I would like to discuss a role.',
    });

    const record = store.findById(id);
    assert.equal(record?.id, id);
    assert.equal(record?.name, 'Ada Lovelace');
    assert.equal(record?.email, 'ada@example.com');
    assert.equal(record?.message, 'I would like to discuss a role.');
    assert.match(record?.submittedAt ?? '', /^\d{4}-\d{2}-\d{2}/);

    store.onModuleDestroy();
  });
});
