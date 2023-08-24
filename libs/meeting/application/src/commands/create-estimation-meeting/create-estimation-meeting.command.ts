import { BaseCommand, CommandProps } from '@lib/shared';

export class CreateEstimationMeetingCommand extends BaseCommand {
  public readonly groupId: string;
  public readonly title: string;
  public readonly userId: string;

  constructor(props: CommandProps<CreateEstimationMeetingCommand>) {
    super();
    this.groupId = props.groupId;
    this.title = props.title;
    this.userId = props.userId;
  }
}
