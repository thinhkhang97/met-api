import { BaseEvent, Logger } from '@lib/shared';
import { IEventHandler } from '@nestjs/cqrs';

export abstract class BaseEventHandler<Event extends BaseEvent>
  implements IEventHandler
{
  private readonly _logger = new Logger(this.constructor.name);

  handle(event: Event): void {
    try {
      this._logger.verbose('Executes with params' + JSON.stringify(event));
      this.execute(event);
      this._logger.verbose('Executed done');
    } catch (error) {
      this._logger.error(error);
    }
  }

  protected abstract execute(event: Event);
}
