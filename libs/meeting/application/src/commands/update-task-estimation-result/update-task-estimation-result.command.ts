import { BaseCommand, CommandProps } from '@lib/shared';

export class UpdateTaskEstimationResultCommand extends BaseCommand {
  public taskEstimationId: string;

  constructor(props: CommandProps<UpdateTaskEstimationResultCommand>) {
    super();
    this.taskEstimationId = props.taskEstimationId;
  }
}
