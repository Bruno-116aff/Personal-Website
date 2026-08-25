import assert from 'node:assert/strict';
import { describe, it } from 'node:test';

import { HealthController } from '../health.controller.js';

describe('HealthController', () => {
  it('reports liveness', () => {
    assert.deepEqual(new HealthController().check(), { status: 'ok' });
  });

  it('reports readiness', () => {
    assert.deepEqual(new HealthController().ready(), { status: 'ready' });
  });
});
