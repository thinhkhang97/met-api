import { EstimationMeeting } from '@lib/meeting/domain';
import { MeetingStatus } from '@lib/meeting/domain/constance';
import { BaseObject } from '@lib/shared';
import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class EstimationMeetingObject extends BaseObject {
  @Field(() => ID)
  public readonly groupId: string;

  @Field(() => String)
  public readonly title: string;

  @Field(() => MeetingStatus)
  public readonly status: MeetingStatus;

  constructor(entity: EstimationMeeting) {
    super(entity);
    const props = entity.getProps();
    this.groupId = props.groupId.unpack();
    this.title = props.title;
    this.status = props.status;
  }
}
