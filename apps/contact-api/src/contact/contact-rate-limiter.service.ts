import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

type RateLimitConfig = {
  maxRequests: number;
  maxRecords?: number;
  windowMs: number;
};

type RateLimitRecord = {
  count: number;
  resetAt: number;
};

@Injectable()
export class ContactRateLimiter {
  private readonly records = new Map<string, RateLimitRecord>();
  private readonly maxRecords: number;
  private nextCleanupAt = 0;

  constructor(private readonly config: RateLimitConfig) {
    this.maxRecords = config.maxRecords ?? 10_000;
  }

  private pruneExpired(now: number) {
    for (const [key, record] of this.records) {
      if (record.resetAt <= now) this.records.delete(key);
    }
  }

  private evictOldest() {
    let oldestKey: string | undefined;
    let oldestResetAt = Number.POSITIVE_INFINITY;

    for (const [key, record] of this.records) {
      if (record.resetAt < oldestResetAt) {
        oldestKey = key;
        oldestResetAt = record.resetAt;
      }
    }

    if (oldestKey) this.records.delete(oldestKey);
  }

  consume(key: string, now = Date.now()) {
    if (now >= this.nextCleanupAt || this.records.size >= this.maxRecords) {
      this.pruneExpired(now);
      this.nextCleanupAt = now + Math.min(this.config.windowMs, 60_000);
    }

    let current = this.records.get(key);

    if (current !== undefined && current.resetAt <= now) {
      this.records.delete(key);
      current = undefined;
    }

    if (!current) {
      if (this.records.size >= this.maxRecords) this.evictOldest();
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
