import { Member } from '@lib/meeting/domain';
import { BaseEvent, EventProps } from '@lib/shared';

/**
 * Event that is published after a member join to the meeting
 * Aggregate root is meeting
 */
export class MemberJoinedEvent extends BaseEvent {
  /**
   * Member who joined to the meeting
   */
  public readonly member: Member;

  constructor(props: EventProps<MemberJoinedEvent>) {
    super(props);
    this.member = props.member;
  }
}
