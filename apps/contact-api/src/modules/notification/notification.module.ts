import { DynamicModule, Module } from '@nestjs/common';

import { TELEGRAM_CONFIG, type TelegramConfig } from '../../core/config/telegram.config.js';
import {
  NOTIFICATION_SERVICE,
  TELEGRAM_FETCH,
  TelegramNotificationService,
  type TelegramFetch,
} from './notification.service.js';

@Module({})
export class NotificationModule {
  static register(config: TelegramConfig | null): DynamicModule {
    const fetcher: TelegramFetch = globalThis.fetch.bind(globalThis);

    return {
      module: NotificationModule,
      providers: [
        { provide: TELEGRAM_CONFIG, useValue: config },
        { provide: TELEGRAM_FETCH, useValue: fetcher },
        TelegramNotificationService,
        { provide: NOTIFICATION_SERVICE, useExisting: TelegramNotificationService },
      ],
      exports: [NOTIFICATION_SERVICE],
    };
  }
}
