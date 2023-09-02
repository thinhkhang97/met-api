import { BaseEvent, CUID, EventProps } from '@lib/shared';

/**
 * This event is triggered after a task estimation has just been removed from a meeting
 * The aggregate root is the meeting
 */
export class TaskEstimationRemovedEvent extends BaseEvent {
  public readonly taskEstimationId: CUID;

  constructor(props: EventProps<TaskEstimationRemovedEvent>) {
    super(props);
    this.taskEstimationId = props.taskEstimationId;
  }
}
