import { BaseCommand, CommandProps, Nullable } from '@lib/shared';

export class UpdateMeetingCommand extends BaseCommand {
  public meetingId: string;
  public title: string;
  public description: Nullable<string>;
  public from: Date;
  public to: Date;

  constructor(props: CommandProps<UpdateMeetingCommand>) {
    super();
    this.meetingId = props.meetingId;
    this.title = props.title;
    this.description = props.description;
    this.from = props.from;
    this.to = props.to;
  }
}
