import { BaseCommand, CommandProps } from '@lib/shared';

export class JoinMeetingCommand extends BaseCommand {
  public readonly meetingId: string;
  public readonly userId: string;

  constructor(props: CommandProps<JoinMeetingCommand>) {
    super();
    this.meetingId = props.meetingId;
    this.userId = props.userId;
  }
}
