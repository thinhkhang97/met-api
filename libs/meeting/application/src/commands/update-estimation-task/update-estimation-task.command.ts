import { BaseCommand, CommandProps, Nullable } from '@lib/shared';

export class UpdateEstimationTaskCommand extends BaseCommand {
  public taskEstimationId: string;
  public meetingId: string;
  public title: string;
  public description: Nullable<string>;

  constructor(props: CommandProps<UpdateEstimationTaskCommand>) {
    super();
    this.meetingId = props.meetingId;
    this.taskEstimationId = props.taskEstimationId;
    this.title = props.title;
    this.description = props.description;
  }
}
