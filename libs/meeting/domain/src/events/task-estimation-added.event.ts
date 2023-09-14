import { TaskTitle } from '@lib/meeting/domain/value-objects';
import { BaseEvent, CUID, EventProps, Nullable } from '@lib/shared';

/**
 * This event is triggered after a task estimation has just been added to a meeting
 * The aggregate root is the meeting
 */
export class TaskEstimationAddedEvent extends BaseEvent {
  public readonly taskEstimationId: CUID;
  public readonly title: TaskTitle;
  public readonly description: Nullable<string>;

  constructor(props: EventProps<TaskEstimationAddedEvent>) {
    super(props);
    this.taskEstimationId = props.taskEstimationId;
    this.title = props.title;
    this.description = props.description;
  }
}
