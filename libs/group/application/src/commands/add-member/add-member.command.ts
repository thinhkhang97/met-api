import { BaseCommand, CommandProps } from '@lib/shared';

export class AddMemberCommand extends BaseCommand {
  public readonly name: string;
  public readonly userId: string;
  public readonly groupId: string;
  public readonly email: string;

  constructor(props: CommandProps<AddMemberCommand>) {
    super();
    this.name = props.name;
    this.userId = props.userId;
    this.groupId = props.groupId;
    this.email = props.email;
  }
}
