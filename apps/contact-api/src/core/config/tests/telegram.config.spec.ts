import assert from 'node:assert/strict';
import { describe, it } from 'node:test';

import { createTelegramConfig } from '../telegram.config.js';

describe('createTelegramConfig', () => {
  it('disables Telegram when both values are absent', () => {
    assert.equal(createTelegramConfig({}), null);
  });

  it('requires the token and chat ID as a pair', () => {
    assert.throws(
      () => createTelegramConfig({ TELEGRAM_BOT_TOKEN: 'token' }),
      /TELEGRAM_BOT_TOKEN and TELEGRAM_CHAT_ID must be configured together/,
    );
  });

  it('returns validated Telegram settings', () => {
    assert.deepEqual(createTelegramConfig({
      TELEGRAM_BOT_TOKEN: ' token ',
      TELEGRAM_CHAT_ID: ' chat ',
    }), {
      apiBaseUrl: 'https://api.telegram.org',
      botToken: 'token',
      chatId: 'chat',
      requestTimeoutMs: 900,
    });
  });
});
