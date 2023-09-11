import { BaseEvent, CUID, EventProps } from '@lib/shared';

/**
 * This event is triggered after a task estimation has just been started
 * The aggregate root is the meeting
 */
export class TaskEstimationStartedEvent extends BaseEvent {
  public readonly taskEstimationId: CUID;

  constructor(props: EventProps<TaskEstimationStartedEvent>) {
    super(props);
    this.taskEstimationId = props.taskEstimationId;
  }
}
