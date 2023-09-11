import { BaseCommand, CommandProps } from '@lib/shared';

export class StartEstimateTaskCommand extends BaseCommand {
  public meetingId: string;
  public taskEstimationId: string;

  constructor(props: CommandProps<StartEstimateTaskCommand>) {
    super();
    this.meetingId = props.meetingId;
    this.taskEstimationId = props.taskEstimationId;
  }
}
