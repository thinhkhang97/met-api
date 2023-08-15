import {
  BaseException,
  BaseQuery,
  InternalServerException,
  Logger,
  Result,
} from '@lib/shared';
import { IQueryHandler } from '@nestjs/cqrs';
import { Err, Ok } from 'oxide.ts';

export abstract class BaseQueryHandler<Query extends BaseQuery, Response>
  implements IQueryHandler<Query, Result<Response, BaseException>>
{
  private readonly _logger = new Logger(this.constructor.name);

  async execute(query: Query): Promise<Result<Response, BaseException>> {
    this._logger.verbose('Executes with params: ' + JSON.stringify(query));
    try {
      const response = await this.handle(query);
      this._logger.verbose('Response: ' + JSON.stringify(response));
      return Ok(response);
    } catch (error) {
      this._logger.error(error);
      if (error instanceof BaseException) {
        return Err(error);
      }

      const errorMessage = error instanceof Error ? error.message : '';
      return Err(new InternalServerException(errorMessage));
    }
  }

  protected abstract handle(query: Query): Promise<Response>;
}
