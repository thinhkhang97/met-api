import { BaseCommand, CommandProps, Nullable } from '@lib/shared';

export class AddEstimationTaskCommand extends BaseCommand {
  public userId: string;
  public meetingId: string;
  public title: string;
  public description: Nullable<string>;

  constructor(props: CommandProps<AddEstimationTaskCommand>) {
    super();
    this.userId = props.userId;
    this.meetingId = props.meetingId;
    this.title = props.title;
    this.description = props.description;
  }
}
