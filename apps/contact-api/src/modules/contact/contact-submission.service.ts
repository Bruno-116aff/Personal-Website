import { BadRequestException, Inject, Injectable, ServiceUnavailableException } from '@nestjs/common';

import { AppLogger } from '../../core/logger/app-logger.service.js';
import { RateLimiter } from '../../core/limiter/rate-limiter.service.js';
import { NOTIFICATION_SERVICE, type NotificationService } from '../notification/notification.service.js';
import type { ContactRequestDto } from './dto/contact-request.dto.js';
import { CONTACT_SUBMISSION_STORE, type ContactSubmissionStore } from './contact-submission.repository.js';

function sanitizeText(value: string) {
  return value
    .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, '')
    .replace(/\r\n/g, '\n')
    .trim();
}

@Injectable()
export class ContactSubmissionService {
  constructor(
    @Inject(CONTACT_SUBMISSION_STORE) private readonly store: ContactSubmissionStore,
    @Inject(RateLimiter) private readonly rateLimiter: RateLimiter,
    @Inject(AppLogger) private readonly logger: AppLogger,
    @Inject(NOTIFICATION_SERVICE) private readonly notification: NotificationService,
  ) {}

  async submit(request: ContactRequestDto, clientKey: string) {
    if (request.website) {
      throw new BadRequestException('Unable to send message.');
    }

    this.rateLimiter.consume(clientKey);

    const submission = {
      name: sanitizeText(request.name),
      email: request.email.trim().toLowerCase(),
      message: sanitizeText(request.message),
    };

    try {
      const id = this.store.save(submission);
      void this.notification.sendContactSubmission({ ...submission, id }).catch((error: unknown) => {
        this.logger.error(
          'Contact submission notification failed.',
          error instanceof Error ? error.stack : undefined,
          ContactSubmissionService.name,
        );
      });
    } catch {
      this.logger.error('Contact submission could not be stored.');
      throw new ServiceUnavailableException('Unable to save message. Please try again later.');
    }

    return { status: 'accepted' } as const;
  }
}
