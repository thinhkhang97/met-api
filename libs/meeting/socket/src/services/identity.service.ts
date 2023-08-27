import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

import { IDENTITY_INTERNAL_SERVICE } from '../constance';

@Injectable()
export class IdentityService {
  constructor(
    @Inject(IDENTITY_INTERNAL_SERVICE)
    private readonly _identityService: ClientProxy,
    private readonly _configService: ConfigService,
  ) {}

  public async authenticate(token: string) {
    try {
      const result = await this._identityService.send(
        { action: 'authenticate' },
        {
          token,
          internalApiKey: this._configService.getOrThrow('INTERNAL_API_KEY'),
        },
      );
      return await firstValueFrom(result);
    } catch (e) {
      console.log(e);
      return null;
    }
  }
}
