import { BaseCommand, CommandProps, Nullable } from '@lib/shared';

export class CreateGroupCommand extends BaseCommand {
  public readonly userId: string;
  public readonly groupName: string;
  public readonly description: Nullable<string>;

  constructor(props: CommandProps<CreateGroupCommand>) {
    super();
    this.userId = props.userId;
    this.groupName = props.groupName;
    this.description = props.description;
  }
}
