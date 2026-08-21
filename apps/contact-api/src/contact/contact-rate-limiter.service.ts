import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

type RateLimitConfig = {
  maxRequests: number;
  windowMs: number;
};

type RateLimitRecord = {
  count: number;
  resetAt: number;
};

@Injectable()
export class ContactRateLimiter {
  private readonly records = new Map<string, RateLimitRecord>();

  constructor(private readonly config: RateLimitConfig) {}

  consume(key: string, now = Date.now()) {
    const current = this.records.get(key);

    if (!current || current.resetAt <= now) {
      this.records.set(key, { count: 1, resetAt: now + this.config.windowMs });
      return;
    }

    if (current.count >= this.config.maxRequests) {
      throw new HttpException(
        'Unable to send message. Please try again later.',
        HttpStatus.TOO_MANY_REQUESTS,
      );
    }

    current.count += 1;
  }
}
