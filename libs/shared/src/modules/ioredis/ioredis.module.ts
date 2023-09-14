import { Module } from '@nestjs/common';

import { ConfigurableModuleClass } from './ioredis.module-definition';
import { IoredisService } from './ioredis.service';

@Module({
  providers: [IoredisService],
  exports: [IoredisService],
})
export class IoredisModule extends ConfigurableModuleClass {}
