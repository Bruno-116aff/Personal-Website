import assert from 'node:assert/strict';
import { describe, it } from 'node:test';

import { BadRequestException, type ArgumentsHost } from '@nestjs/common';

import { HttpErrorFilter } from '../http-error.filter.js';
import type { AppLogger } from '../../logger/app-logger.service.js';

type CapturedResponse = {
  body?: unknown;
  statusCode?: number;
};

function createHost(captured: CapturedResponse): ArgumentsHost {
  return {
    switchToHttp: () => ({
      getRequest: () => ({ method: 'POST', url: '/contact' }),
      getResponse: () => ({
        status: (statusCode: number) => ({
          json: (body: unknown) => {
            captured.statusCode = statusCode;
            captured.body = body;
          },
        }),
      }),
    }),
  } as unknown as ArgumentsHost;
}

describe('HttpErrorFilter', () => {
  it('returns a safe known HTTP error response', () => {
    const captured: CapturedResponse = {};
    const filter = new HttpErrorFilter({ warn() {}, error() {} } as unknown as AppLogger);

    filter.catch(new BadRequestException('Unable to send message.'), createHost(captured));

    assert.equal(captured.statusCode, 400);
    assert.deepEqual(captured.body, {
      statusCode: 400,
      message: 'Unable to send message.',
    });
  });

  it('hides unexpected server error details', () => {
    const captured: CapturedResponse = {};
    const filter = new HttpErrorFilter({ warn() {}, error() {} } as unknown as AppLogger);

    filter.catch(new Error('database secret'), createHost(captured));

    assert.equal(captured.statusCode, 500);
    assert.deepEqual(captured.body, {
      statusCode: 500,
      message: 'Internal server error.',
    });
  });
});
