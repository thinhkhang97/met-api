import { CacheKey } from '@lib/shared';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject, Injectable } from '@nestjs/common';
import { Cache } from 'cache-manager';

import { User } from '../types';

@Injectable()
export class UserCache {
  constructor(@Inject(CACHE_MANAGER) protected readonly _cacheManager: Cache) {}

  async findOneByClientId(clientId: string) {
    return await this._cacheManager.get<User>(`${CacheKey.CLIENT}:${clientId}`);
  }

  async findOneByUserId(userId: string) {
    return await this._cacheManager.get<User>(`${CacheKey.USER}:${userId}`);
  }
}
