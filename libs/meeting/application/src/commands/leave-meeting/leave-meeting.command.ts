import { BaseCommand, CommandProps } from '@lib/shared';

export class LeaveMeetingCommand extends BaseCommand {
  public meetingId: string;
  public memberId: string;

  constructor(props: CommandProps<LeaveMeetingCommand>) {
    super();
    this.memberId = props.memberId;
    this.meetingId = props.meetingId;
  }
}
