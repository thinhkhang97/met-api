import { BaseCommand, CommandProps } from '@lib/shared';

export class RemoveMemberCommand extends BaseCommand {
  public readonly groupId: string;
  public readonly memberId: string;
  public readonly userId: string;

  constructor(props: CommandProps<RemoveMemberCommand>) {
    super();
    this.memberId = props.memberId;
    this.groupId = props.groupId;
    this.userId = props.userId;
  }
}
