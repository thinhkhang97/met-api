import { MemberRole } from '@lib/meeting/domain/constance';
import { BaseCommand, CommandProps } from '@lib/shared';

export class UpdateMemberRoleCommand extends BaseCommand {
  public meetingId: string;
  public userId: string;
  public role: MemberRole;

  constructor(props: CommandProps<UpdateMemberRoleCommand>) {
    super();
    this.meetingId = props.meetingId;
    this.userId = props.userId;
    this.role = props.role;
  }
}
