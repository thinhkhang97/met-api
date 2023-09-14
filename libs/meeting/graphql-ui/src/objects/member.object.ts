import { Member } from '@lib/meeting/domain';
import { MemberRole, MemberStatus } from '@lib/meeting/domain/constance';
import { BaseObject } from '@lib/shared';
import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType('MeetingMember')
export class MemberObject extends BaseObject {
  @Field(() => ID)
  public readonly memberId: string;

  @Field(() => String)
  public readonly name: string;

  @Field(() => MemberRole)
  public readonly role: MemberRole;

  @Field(() => MemberStatus)
  public readonly status: MemberStatus;

  @Field(() => ID)
  public readonly meetingId: string;

  constructor(entity: Member) {
    super(entity);
    const props = entity.getProps();
    this.memberId = props.memberId.unpack();
    this.role = props.role;
    this.name = props.name;
    this.meetingId = props.meetingId.unpack();
    this.status = props.status;
  }
}
