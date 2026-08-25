import { Injectable, type LoggerService } from '@nestjs/common';

type LogLevel = 'debug' | 'error' | 'fatal' | 'info' | 'verbose' | 'warn';

@Injectable()
export class AppLogger implements LoggerService {
  private context?: string;

  setContext(context: string) {
    this.context = context;
  }

  log(message: unknown, context?: string) {
    this.write('info', message, context);
  }

  error(message: unknown, stack?: string, context?: string) {
    this.write('error', message, context, stack);
  }

  warn(message: unknown, context?: string) {
    this.write('warn', message, context);
  }

  debug(message: unknown, context?: string) {
    this.write('debug', message, context);
  }

  verbose(message: unknown, context?: string) {
    this.write('verbose', message, context);
  }

  fatal(message: unknown, context?: string) {
    this.write('fatal', message, context);
  }

  private write(level: LogLevel, message: unknown, context?: string, stack?: string) {
    const entry = {
      timestamp: new Date().toISOString(),
      level,
      service: 'contact-api',
      ...(context ?? this.context ? { context: context ?? this.context } : {}),
      message: this.stringify(message),
      ...(stack ? { stack } : {}),
    };

    process.stdout.write(`${JSON.stringify(entry)}\n`);
  }

  private stringify(value: unknown) {
    if (typeof value === 'string') return value;

    try {
      return JSON.stringify(value);
    } catch {
      return String(value);
    }
  }
}
