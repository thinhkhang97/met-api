import { BaseQuery, ID } from '@lib/shared/ddd';
import { IEvent } from '@nestjs/cqrs';

export type EventProps<E extends BaseQuery> = E;

/**
 * Base domain event
 */
export abstract class BaseEvent implements IEvent {
  /**
   * ID of aggregate root which has just triggered the event
   */
  public readonly aggregateId: ID;

  constructor(props: EventProps<BaseEvent>) {
    this.aggregateId = props.aggregateId;
  }
}
