import { Module } from '@nestjs/common';

import type { ContactConfig } from './contact.config.js';
import { ContactController } from './contact.controller.js';
import { ContactRateLimiter } from './contact-rate-limiter.service.js';
import {
  CONTACT_CONFIG,
  CONTACT_SUBMISSION_STORE,
  SQLiteContactSubmissionStore,
} from './contact-submission.repository.js';
import { ContactSubmissionService } from './contact-submission.service.js';

@Module({})
export class ContactModule {
  static register(config: ContactConfig) {
    return {
      module: ContactModule,
      controllers: [ContactController],
      providers: [
        { provide: CONTACT_CONFIG, useValue: config },
        {
          provide: ContactRateLimiter,
          useFactory: () => new ContactRateLimiter(config.rateLimit),
        },
        SQLiteContactSubmissionStore,
        { provide: CONTACT_SUBMISSION_STORE, useExisting: SQLiteContactSubmissionStore },
        ContactSubmissionService,
      ],
    };
  }
}
