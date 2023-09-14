import { IoredisModuleOptions } from '@lib/shared/modules/ioredis/ioredis.options';
import { ConfigurableModuleBuilder } from '@nestjs/common';

export const { ConfigurableModuleClass, MODULE_OPTIONS_TOKEN, OPTIONS_TYPE } =
  new ConfigurableModuleBuilder<IoredisModuleOptions>().build();
