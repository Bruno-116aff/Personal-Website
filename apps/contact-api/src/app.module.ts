import { Module } from '@nestjs/common';

import { createContactConfig } from './contact/contact.config.js';
import { ContactModule } from './contact/contact.module.js';

@Module({
  imports: [ContactModule.register(createContactConfig())],
})
export class AppModule {}
