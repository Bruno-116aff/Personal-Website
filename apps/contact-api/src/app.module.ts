import { Module } from '@nestjs/common';

import { createContactConfig } from './core/config/contact.config.js';
import { createTelegramConfig } from './core/config/telegram.config.js';
import { CoreModule } from './core/core.module.js';
import { ContactModule } from './modules/contact/contact.module.js';

@Module({
  imports: [CoreModule, ContactModule.register(createContactConfig(), createTelegramConfig())],
})
export class AppModule {}
