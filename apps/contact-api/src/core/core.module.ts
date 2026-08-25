import { Global, Module } from '@nestjs/common';

import { HttpErrorFilter } from './errors/http-error.filter.js';
import { HealthController } from './health/health.controller.js';
import { AppLogger } from './logger/app-logger.service.js';

@Global()
@Module({
  controllers: [HealthController],
  providers: [AppLogger, HttpErrorFilter],
  exports: [AppLogger, HttpErrorFilter],
})
export class CoreModule {}
