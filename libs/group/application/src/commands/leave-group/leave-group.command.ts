import { BaseCommand, CommandProps } from '@lib/shared';

export class LeaveGroupCommand extends BaseCommand {
  public userId: string;
  public groupId: string;

  constructor(props: CommandProps<LeaveGroupCommand>) {
    super();
    this.userId = props.userId;
    this.groupId = props.groupId;
  }
}
