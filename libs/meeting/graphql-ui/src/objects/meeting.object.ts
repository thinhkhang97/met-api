import { EstimationMeeting } from '@lib/meeting/domain';
import { MeetingStatus } from '@lib/meeting/domain/constance';
import { BaseObject } from '@lib/shared';
import { Field, ID, ObjectType } from '@nestjs/graphql';

import { MemberObject } from './member.object';

@ObjectType({ isAbstract: true })
export abstract class MeetingObject extends BaseObject {
  @Field(() => ID)
  public readonly groupId: string;

  @Field(() => String)
  public readonly title: string;

  @Field(() => MeetingStatus)
  public readonly status: MeetingStatus;

  @Field(() => [MemberObject])
  public readonly members: MemberObject[];

  constructor(entity: EstimationMeeting) {
    super(entity);
    const props = entity.getProps();
    this.groupId = props.groupId.unpack();
    this.title = props.title;
    this.status = props.status;
    this.members = props.members.map((member) => new MemberObject(member));
  }
}
