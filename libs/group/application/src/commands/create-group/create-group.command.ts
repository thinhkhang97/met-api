import { BaseCommand, CommandProps } from '@lib/shared';

export class CreateGroupCommand extends BaseCommand {
  public readonly userId: string;
  public readonly ownerName: string;
  public readonly groupName: string;

  constructor(props: CommandProps<CreateGroupCommand>) {
    super();
    this.userId = props.userId;
    this.ownerName = props.ownerName;
    this.groupName = props.groupName;
  }
}
