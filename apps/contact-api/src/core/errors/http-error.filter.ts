import {
  ArgumentsHost,
  Catch,
  HttpException,
  HttpStatus,
  type ExceptionFilter,
} from '@nestjs/common';

import { AppLogger } from '../logger/app-logger.service.js';

type ResponseLike = {
  status(statusCode: number): { json(body: unknown): void };
};

type RequestLike = {
  method?: string;
  url?: string;
};

@Catch()
export class HttpErrorFilter implements ExceptionFilter {
  constructor(private readonly logger: AppLogger) {}

  catch(exception: unknown, host: ArgumentsHost) {
    const context = host.switchToHttp();
    const response = context.getResponse<ResponseLike>();
    const request = context.getRequest<RequestLike>();
    const status = exception instanceof HttpException ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR;

    if (status >= HttpStatus.INTERNAL_SERVER_ERROR) {
      this.logger.error(
        `${request.method ?? 'HTTP'} ${request.url ?? 'unknown'} failed`,
        exception instanceof Error ? exception.stack : undefined,
        HttpErrorFilter.name,
      );
    } else {
      this.logger.warn(`${request.method ?? 'HTTP'} ${request.url ?? 'unknown'} returned ${status}`, HttpErrorFilter.name);
    }

    response.status(status).json({
      statusCode: status,
      message: this.safeMessage(exception, status),
    });
  }

  private safeMessage(exception: unknown, status: number): string | string[] {
    if (status >= HttpStatus.INTERNAL_SERVER_ERROR) return 'Internal server error.';
    if (!(exception instanceof HttpException)) return 'Request failed.';

    const body = exception.getResponse();
    if (typeof body === 'string') return body;

    if (typeof body === 'object' && body !== null && 'message' in body) {
      const message = body.message;
      if (typeof message === 'string') return message;
      if (Array.isArray(message) && message.every((item) => typeof item === 'string')) return message;
    }

    return 'Request failed.';
  }
}
