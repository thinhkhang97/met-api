import { RedisOptions } from 'ioredis/built/redis/RedisOptions';

export interface IoredisModuleOptions extends RedisOptions {
  host: string;
  port: number;
}
