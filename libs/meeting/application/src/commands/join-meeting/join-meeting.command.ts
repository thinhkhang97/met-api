import { BaseCommand, CommandProps } from '@lib/shared';

export class JoinMeetingCommand extends BaseCommand {
  public readonly memberId: string;
  public readonly memberName: string;
  public readonly meetingId: string;

  constructor(props: CommandProps<JoinMeetingCommand>) {
    super();
    this.memberId = props.memberId;
    this.memberName = props.memberName;
    this.meetingId = props.meetingId;
  }
}
