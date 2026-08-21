import { Body, Controller, Inject, Post, Req } from '@nestjs/common';

import { ContactRequestDto } from './contact-request.dto.js';
import { ContactSubmissionService } from './contact-submission.service.js';

type ContactRequest = {
  ip?: string;
  socket?: { remoteAddress?: string };
};

@Controller('contact')
export class ContactController {
  constructor(@Inject(ContactSubmissionService) private readonly contactSubmission: ContactSubmissionService) {}

  @Post()
  submit(@Body() payload: ContactRequestDto, @Req() request: ContactRequest) {
    const clientKey = request.ip ?? request.socket?.remoteAddress ?? 'unknown';
    return this.contactSubmission.submit(payload, clientKey);
  }
}
