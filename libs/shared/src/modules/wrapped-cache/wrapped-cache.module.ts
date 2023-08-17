import { CacheModule } from '@nestjs/cache-manager';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { redisStore } from 'cache-manager-redis-store';
import { RedisClientOptions } from 'redis';

export class WrappedCacheModule {
  public static forRedis(envFilePath: string) {
    return CacheModule.registerAsync<RedisClientOptions>({
      imports: [ConfigModule.forRoot({ envFilePath })],
      useFactory: (_configService: ConfigService) => {
        return {
          store: async () => {
            return await redisStore({
              socket: {
                host: _configService.getOrThrow('REDIS_HOST'),
                port: _configService.getOrThrow('REDIS_PORT'),
              },
            });
          },
          ttl: 3600 * 1000,
          isGlobal: true,
        };
      },
      inject: [ConfigService],
    });
  }
}
