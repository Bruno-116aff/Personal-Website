import { BadRequestException, Inject, Injectable, Logger, ServiceUnavailableException } from '@nestjs/common';

import { ContactRateLimiter } from './contact-rate-limiter.service.js';
import type { ContactRequestDto } from './contact-request.dto.js';
import { CONTACT_SUBMISSION_STORE, type ContactSubmissionStore } from './contact-submission.repository.js';

function sanitizeText(value: string) {
  return value
    .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, '')
    .replace(/\r\n/g, '\n')
    .trim();
}

@Injectable()
export class ContactSubmissionService {
  private readonly logger = new Logger(ContactSubmissionService.name);

  constructor(
    @Inject(CONTACT_SUBMISSION_STORE) private readonly store: ContactSubmissionStore,
    @Inject(ContactRateLimiter) private readonly rateLimiter: ContactRateLimiter,
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
      this.store.save(submission);
    } catch {
      this.logger.error('Contact submission could not be stored.');
      throw new ServiceUnavailableException('Unable to save message. Please try again later.');
    }

    return { status: 'accepted' } as const;
  }
}
