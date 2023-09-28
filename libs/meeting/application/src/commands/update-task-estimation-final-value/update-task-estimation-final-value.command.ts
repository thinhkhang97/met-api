import { BaseCommand, CommandProps, Nullable } from '@lib/shared';

export class UpdateTaskEstimationFinalValueCommand extends BaseCommand {
  public meetingId: string;
  public userId: string;
  public taskEstimationId: string;
  public finalEstimation: Nullable<number>;

  constructor(props: CommandProps<UpdateTaskEstimationFinalValueCommand>) {
    super();
    this.meetingId = props.meetingId;
    this.userId = props.userId;
    this.taskEstimationId = props.taskEstimationId;
    this.finalEstimation = props.finalEstimation;
  }
}
