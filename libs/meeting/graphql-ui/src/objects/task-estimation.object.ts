import { TaskEstimation } from '@lib/meeting/domain';
import { MemberEstimationObject } from '@lib/meeting/graphql-ui/objects/member-estimation.object';
import { BaseObject, Nullable } from '@lib/shared';
import { Field, Float, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class TaskEstimationObject extends BaseObject {
  @Field(() => ID)
  public readonly meetingId: string;

  @Field(() => String)
  public readonly title: string;

  @Field(() => String, { nullable: true })
  public readonly description: Nullable<string>;

  @Field(() => [MemberEstimationObject])
  public readonly memberEstimation: MemberEstimationObject[];

  @Field(() => Float, { nullable: true })
  public readonly averageEstimation: Nullable<number>;

  constructor(entity: TaskEstimation) {
    super(entity);
    const props = entity.getProps();
    this.meetingId = props.meetingId.unpack();
    this.title = props.title.unpack();
    this.description = props.description;
    this.memberEstimation = props.memberEstimations.map(
      (memberEstimation) => new MemberEstimationObject(memberEstimation),
    );
    this.averageEstimation = props.averageEstimation;
  }
}
