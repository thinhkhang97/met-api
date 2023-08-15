import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AxiosRequestConfig } from 'axios';

import { BaseHttpService } from './base-http.service';

@Injectable()
export class IdentityHttpService extends BaseHttpService {
  constructor(
    private readonly _configService: ConfigService,
    private readonly _axiosHttpService: HttpService,
  ) {
    super(_axiosHttpService);
  }

  protected getBaseConfig(): Required<Pick<AxiosRequestConfig, 'baseURL'>> &
    AxiosRequestConfig {
    return {
      baseURL: this._configService.getOrThrow<string>(
        'IDENTITY_INTERNAL_SERVICE',
      ),
      headers: {
        'x-internal-api-key':
          this._configService.getOrThrow('INTERNAL_API_KEY'),
      },
    };
  }
}
