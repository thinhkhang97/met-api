import { BaseCommand, CommandProps, Nullable } from '@lib/shared';

export class UpdateMemberEstimationCommand extends BaseCommand {
  public meetingId: string;
  public meetingMemberId: string;
  public taskEstimationId: string;
  public estimationValue: Nullable<number>;

  constructor(props: CommandProps<UpdateMemberEstimationCommand>) {
    super();
    this.meetingId = props.meetingId;
    this.meetingMemberId = props.meetingMemberId;
    this.taskEstimationId = props.taskEstimationId;
    this.estimationValue = props.estimationValue;
  }
}
