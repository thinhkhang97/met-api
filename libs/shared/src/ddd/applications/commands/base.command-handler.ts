import { BaseException, InternalServerException, Logger } from '@lib/shared';
import { ICommandHandler } from '@nestjs/cqrs';
import { Err, Ok, Result } from 'oxide.ts';

import { BaseCommand } from './base.command';

export abstract class BaseCommandHandler<C extends BaseCommand, R>
  implements ICommandHandler<C, Result<R, BaseException>>
{
  private readonly _logger = new Logger(this.constructor.name);

  async execute(command: C): Promise<Result<R, BaseException>> {
    this._logger.verbose('Executes with params: ' + JSON.stringify(command));
    try {
      const response = await this.handle(command);
      this._logger.verbose('Responses: ' + JSON.stringify(response));
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

  abstract handle(command: C): Promise<R> | R;
}
