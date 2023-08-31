import { Member } from '@lib/meeting/domain';
import { BaseEvent, EventProps } from '@lib/shared';

/**
 * Event that is published after a member left the meeting
 * Aggregate root is meeting
 */
export class MemberLeftEvent extends BaseEvent {
  /**
   * Member who has just left to the meeting
   */
  public readonly member: Member;

  constructor(props: EventProps<MemberLeftEvent>) {
    super(props);
    this.member = props.member;
  }
}
