import { MemberEstimation } from '@lib/meeting/domain';
import { BaseObject, Nullable } from '@lib/shared';
import { Field, Float, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class MemberEstimationObject extends BaseObject {
  @Field(() => ID)
  public readonly meetingMemberId: string;

  @Field(() => ID)
  public readonly taskEstimationId: string;

  @Field(() => Float, { nullable: true })
  public readonly estimation: Nullable<number>;

  constructor(entity: MemberEstimation) {
    super(entity);
    const props = entity.getProps();
    this.meetingMemberId = props.meetingMemberId.unpack();
    this.taskEstimationId = props.taskEstimationId.unpack();
    this.estimation = props.estimation;
  }
}
