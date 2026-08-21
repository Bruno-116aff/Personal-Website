import 'reflect-metadata';

import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import type { NestExpressApplication } from '@nestjs/platform-express';

import { AppModule } from './app.module.js';
import { createContactConfig } from './contact/contact.config.js';

async function bootstrap() {
  const config = createContactConfig();
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.set('trust proxy', 1);
  app.enableCors({ origin: config.allowedOrigin, methods: ['POST'] });
  app.useGlobalPipes(new ValidationPipe({ transform: true, whitelist: true, forbidNonWhitelisted: true }));

  await app.listen(config.port);
}

void bootstrap();
