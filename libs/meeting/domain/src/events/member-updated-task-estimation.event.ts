import { BaseEvent, CUID, EventProps } from '@lib/shared';

/**
 * Triggered when a member in the meeting update their estimation for a task
 * Aggregate root id task estimation id
 */
export class MemberUpdatedTaskEstimationEvent extends BaseEvent {
  public meetingMemberId: CUID;

  constructor(props: EventProps<MemberUpdatedTaskEstimationEvent>) {
    super(props);
    this.meetingMemberId = props.meetingMemberId;
  }
}
