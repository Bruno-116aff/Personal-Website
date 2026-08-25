import { Module } from '@nestjs/common';

import { CONTACT_CONFIG, type ContactConfig } from '../../core/config/contact.config.js';
import type { TelegramConfig } from '../../core/config/telegram.config.js';
import { CoreModule } from '../../core/core.module.js';
import { SQLiteContactSubmissionStore } from '../../core/database/contact-submission.store.js';
import { RateLimiter } from '../../core/limiter/rate-limiter.service.js';
import { ContactController } from './contact.controller.js';
import { CONTACT_SUBMISSION_STORE } from './contact-submission.repository.js';
import { ContactSubmissionService } from './contact-submission.service.js';
import { NotificationModule } from '../notification/notification.module.js';

@Module({})
export class ContactModule {
  static register(config: ContactConfig, telegramConfig: TelegramConfig | null) {
    return {
      module: ContactModule,
      imports: [CoreModule, NotificationModule.register(telegramConfig)],
      controllers: [ContactController],
      providers: [
        { provide: CONTACT_CONFIG, useValue: config },
        {
          provide: RateLimiter,
          useFactory: () => new RateLimiter(config.rateLimit),
        },
        SQLiteContactSubmissionStore,
        { provide: CONTACT_SUBMISSION_STORE, useExisting: SQLiteContactSubmissionStore },
        ContactSubmissionService,
      ],
    };
  }
}
