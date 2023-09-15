import { CacheModule } from '@nestjs/cache-manager';
import { ConfigService } from '@nestjs/config';
import { redisStore } from 'cache-manager-redis-store';
import { RedisClientOptions } from 'redis';

export class WrappedCacheModule {
  public static forRedis() {
    return CacheModule.registerAsync<RedisClientOptions>({
      useFactory: (_configService: ConfigService) => {
        return {
          store: async () => {
            const username = _configService.getOrThrow('REDIS_USERNAME');
            const password = _configService.getOrThrow('REDIS_PASSWORD');
            const host = _configService.getOrThrow('REDIS_HOST');
            const port = _configService.getOrThrow('REDIS_PORT');
            const url = `redis://${username}:${password}@${host}:${port}/0`;
            return await redisStore({
              url,
              ttl: 3600 * 6,
            });
          },
          isGlobal: true,
        };
      },
      inject: [ConfigService],
    });
  }
}
