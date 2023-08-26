import { BaseQuery, ID } from '@lib/shared/ddd';

export type EventProps<E extends BaseQuery> = E;

/**
 * Base domain event
 */
export abstract class BaseEvent {
  /**
   * ID of aggregate root which has just triggered the event
   */
  public readonly aggregateId: ID;

  constructor(props: EventProps<BaseEvent>) {
    this.aggregateId = props.aggregateId;
  }
}
