import { Logger } from '@lib/shared';
import { Inject, Injectable } from '@nestjs/common';
import Redis from 'ioredis';

import { MODULE_OPTIONS_TOKEN } from './ioredis.module-definition';
import { IoredisModuleOptions } from './ioredis.options';

@Injectable()
export class IoredisService {
  private readonly redis: Redis;
  private readonly logger: Logger;

  constructor(@Inject(MODULE_OPTIONS_TOKEN) options: IoredisModuleOptions) {
    this.redis = new Redis(options.port, options.host, { ...options, db: 0 });
    this.logger = new Logger(this.constructor.name);
  }

  public async publish(channel: string | Buffer, message: string | Buffer) {
    await this.redis.publish(channel, message);
    this.logger.log(`Publish to channel: ${channel} message: ${message}`);
    return 0;
  }

  public async subscribe(...args: [...channels: (string | Buffer)[]]) {
    const result = await this.redis.subscribe(...args);
    args.map((channels) => this.logger.log(`Subscribe channel: ${channels}`));
    return result;
  }

  public onMessage(cb: (channel: string, message: string) => void) {
    this.redis.on('message', cb);
  }
}
