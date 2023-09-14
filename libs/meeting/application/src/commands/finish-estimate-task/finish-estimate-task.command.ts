import { BaseCommand, CommandProps } from '@lib/shared';

export class FinishEstimateTaskCommand extends BaseCommand {
  public meetingId: string;
  public taskEstimationId: string;

  constructor(props: CommandProps<FinishEstimateTaskCommand>) {
    super();
    this.meetingId = props.meetingId;
    this.taskEstimationId = props.taskEstimationId;
  }
}
