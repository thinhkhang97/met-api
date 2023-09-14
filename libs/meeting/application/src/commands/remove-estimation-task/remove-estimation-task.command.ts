import { BaseCommand, CommandProps } from '@lib/shared';

export class RemoveEstimationTaskCommand extends BaseCommand {
  public meetingId: string;
  public taskEstimationId: string;

  constructor(props: CommandProps<RemoveEstimationTaskCommand>) {
    super();
    this.meetingId = props.meetingId;
    this.taskEstimationId = props.taskEstimationId;
  }
}
