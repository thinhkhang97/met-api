import { BaseException, InternalServerException } from '@lib/shared';
import { BaseRequest } from '@lib/shared/ddd/rest-ui';
import { Logger } from '@lib/shared/services';
import { Err, Ok } from '@lib/shared/types';
import { HttpService as AxiosHttpService } from '@nestjs/axios';
import { AxiosError, AxiosRequestConfig } from 'axios';
import { merge } from 'lodash';
import { Result } from 'oxide.ts';

export abstract class BaseHttpService {
  private readonly _logger = new Logger(this.constructor.name);

  constructor(private readonly _httpService: AxiosHttpService) {}

  public async send<Response = undefined>(
    request: BaseRequest,
  ): Promise<Result<Response, BaseException>> {
    const config = {
      ...merge(this.getBaseConfig(), request.config),
    };
    try {
      this._logger.log(`REQ: ${[JSON.stringify(config)].join('-')}`);
      const response = await this._httpService.axiosRef.request<Response>(
        config,
      );
      this._logger.verbose(
        `RES: ${[response.status, JSON.stringify(response.data)].join('-')}`,
      );
      return Ok(response.data);
    } catch (error) {
      if (error instanceof AxiosError) {
        this._logger.error(`RES: ${[error.status, error.message].join('-')}`);
      }
      const errorMessage = error instanceof Error ? error.message : '';
      return Err(new InternalServerException(errorMessage));
    }
  }

  protected abstract getBaseConfig(): Required<
    Pick<AxiosRequestConfig, 'baseURL'>
  > &
    AxiosRequestConfig;
}
