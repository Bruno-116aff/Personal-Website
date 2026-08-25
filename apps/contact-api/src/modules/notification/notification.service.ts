import { Inject, Injectable } from '@nestjs/common';

import { TELEGRAM_CONFIG, type TelegramConfig } from '../../core/config/telegram.config.js';

export type ContactNotification = {
  email: string;
  id?: number;
  message: string;
  name: string;
};

export interface NotificationService {
  sendContactSubmission(submission: ContactNotification): Promise<void>;
}

export const NOTIFICATION_SERVICE = Symbol('NOTIFICATION_SERVICE');
export const TELEGRAM_FETCH = Symbol('TELEGRAM_FETCH');
export type TelegramFetch = (input: string | URL, init?: RequestInit) => Promise<Response>;

const TELEGRAM_MESSAGE_LIMIT = 4_096;

@Injectable()
export class TelegramNotificationService implements NotificationService {
  constructor(
    @Inject(TELEGRAM_CONFIG) private readonly config: TelegramConfig | null,
    @Inject(TELEGRAM_FETCH) private readonly fetcher: TelegramFetch,
  ) {}

  async sendContactSubmission(submission: ContactNotification) {
    if (!this.config) return;

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), this.config.requestTimeoutMs);
    timeout.unref();

    try {
      const response = await this.fetcher(
        `${this.config.apiBaseUrl}/bot${this.config.botToken}/sendMessage`,
        {
          method: 'POST',
          headers: { 'content-type': 'application/json' },
          body: JSON.stringify({
            chat_id: this.config.chatId,
            disable_web_page_preview: true,
            text: this.formatMessage(submission),
          }),
          signal: controller.signal,
        },
      );

      if (!response.ok) {
        throw new Error(`Telegram API responded with status ${response.status}.`);
      }

      const result = await response.json() as { ok?: boolean };
      if (result.ok !== true) {
        throw new Error('Telegram API rejected the notification.');
      }
    } finally {
      clearTimeout(timeout);
    }
  }

  private formatMessage(submission: ContactNotification) {
    const id = submission.id === undefined ? '' : `ID: ${submission.id}`;
    const message = [
      'New contact request',
      `Name: ${submission.name}`,
      `Email: ${submission.email}`,
      `Message:\n${submission.message}`,
      id,
    ].filter(Boolean).join('\n\n');

    return message.length > TELEGRAM_MESSAGE_LIMIT
      ? `${message.slice(0, TELEGRAM_MESSAGE_LIMIT - 1)}…`
      : message;
  }
}
