import { BaseEvent, CUID, EventProps } from '@lib/shared';

/**
 * This event is triggered after a task estimation has just been finished
 * The aggregate root is the meeting
 */
export class TaskEstimationFinishedEvent extends BaseEvent {
  public readonly taskEstimationId: CUID;

  constructor(props: EventProps<TaskEstimationFinishedEvent>) {
    super(props);
    this.taskEstimationId = props.taskEstimationId;
  }
}
