import 'reflect-metadata';

import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import type { NestExpressApplication } from '@nestjs/platform-express';

import { AppModule } from './app.module.js';
import { createContactConfig } from './core/config/contact.config.js';
import { HttpErrorFilter } from './core/errors/http-error.filter.js';
import { AppLogger } from './core/logger/app-logger.service.js';

async function bootstrap() {
  const config = createContactConfig();
  const app = await NestFactory.create<NestExpressApplication>(AppModule, { bufferLogs: true });
  const logger = app.get(AppLogger);

  app.useLogger(logger);
  app.useGlobalFilters(app.get(HttpErrorFilter));
  app.set('trust proxy', process.env.NODE_ENV === 'production' ? 1 : 0);
  app.enableCors({ origin: config.allowedOrigin, methods: ['POST'] });
  app.useGlobalPipes(new ValidationPipe({ transform: true, whitelist: true, forbidNonWhitelisted: true }));

  await app.listen(config.port);
}

void bootstrap();
