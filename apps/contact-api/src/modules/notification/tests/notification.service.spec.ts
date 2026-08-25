import assert from 'node:assert/strict';
import { describe, it } from 'node:test';

import type { TelegramConfig } from '../../../core/config/telegram.config.js';
import { TelegramNotificationService, type TelegramFetch } from '../notification.service.js';

const config: TelegramConfig = {
  apiBaseUrl: 'https://api.telegram.org',
  botToken: 'test-token',
  chatId: 'test-chat',
  requestTimeoutMs: 900,
};

function response(body: unknown, ok = true, status = 200) {
  return {
    ok,
    status,
    json: async () => body,
  } as Response;
}

describe('TelegramNotificationService', () => {
  it('does nothing when Telegram is not configured', async () => {
    let calls = 0;
    const fetcher: TelegramFetch = async () => {
      calls += 1;
      return response({ ok: true });
    };

    await new TelegramNotificationService(null, fetcher).sendContactSubmission({
      email: 'ada@example.com',
      message: 'Hello',
      name: 'Ada Lovelace',
    });

    assert.equal(calls, 0);
  });

  it('sends a contact submission to the configured chat', async () => {
    let request: { input: string | URL; init?: RequestInit } | undefined;
    const fetcher: TelegramFetch = async (input, init) => {
      request = { input, init };
      return response({ ok: true });
    };

    await new TelegramNotificationService(config, fetcher).sendContactSubmission({
      email: 'ada@example.com',
      id: 7,
      message: 'Hello',
      name: 'Ada Lovelace',
    });

    assert.equal(request?.input, 'https://api.telegram.org/bottest-token/sendMessage');
    assert.equal(request?.init?.method, 'POST');
    assert.deepEqual(JSON.parse(String(request?.init?.body)), {
      chat_id: 'test-chat',
      disable_web_page_preview: true,
      text: 'New contact request\n\nName: Ada Lovelace\n\nEmail: ada@example.com\n\nMessage:\nHello\n\nID: 7',
    });
  });

  it('reports a rejected Telegram response', async () => {
    const fetcher: TelegramFetch = async () => response({ ok: false }, false, 400);
    const service = new TelegramNotificationService(config, fetcher);

    await assert.rejects(
      () => service.sendContactSubmission({ email: 'ada@example.com', message: 'Hello', name: 'Ada' }),
      /Telegram API responded with status 400/,
    );
  });
});
