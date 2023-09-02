import { BaseCommand, CommandProps, Nullable } from '@lib/shared';

export class AddEstimationTaskCommand extends BaseCommand {
  public meetingId: string;
  public memberId: string;
  public title: string;
  public description: Nullable<string>;

  constructor(props: CommandProps<AddEstimationTaskCommand>) {
    super();
    this.memberId = props.memberId;
    this.meetingId = props.meetingId;
    this.title = props.title;
    this.description = props.description;
  }
}
