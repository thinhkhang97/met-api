import { BaseEvent, CUID, EventProps, Nullable } from '@lib/shared';

/**
 * Trigger event when a user update the final task estimation value
 * Aggregate root is the meeting
 */
export class TaskEstimationUpdatedFinalEstimationEvent extends BaseEvent {
  public finalEstimation: Nullable<number>;
  public taskEstimationId: CUID;

  constructor(props: EventProps<TaskEstimationUpdatedFinalEstimationEvent>) {
    super(props);
    this.taskEstimationId = props.taskEstimationId;
    this.finalEstimation = props.finalEstimation;
  }
}
