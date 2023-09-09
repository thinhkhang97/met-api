import { Meeting } from '@lib/meeting/domain';
import { MeetingStatus } from '@lib/meeting/domain/constance';
import { MemberObject } from '@lib/meeting/graphql-ui/objects/member.object';
import { BaseObject, Nullable } from '@lib/shared';
import { Field, GraphQLISODateTime, ID, ObjectType } from '@nestjs/graphql';

@ObjectType({ isAbstract: true })
export abstract class MeetingObject extends BaseObject {
  @Field(() => ID)
  public readonly groupId: string;

  @Field(() => String)
  public readonly title: string;

  @Field(() => String, { nullable: true })
  public readonly description: Nullable<string>;

  @Field(() => MeetingStatus)
  public readonly status: MeetingStatus;

  @Field(() => [MemberObject])
  public readonly members: MemberObject[];

  @Field(() => GraphQLISODateTime)
  public readonly from: Date;

  @Field(() => GraphQLISODateTime)
  public readonly to: Date;

  constructor(entity: Meeting<any>) {
    super(entity);
    const props = entity.getProps();
    this.groupId = props.groupId.unpack();
    this.title = props.title;
    this.description = props.description;
    this.status = props.status;
    this.members = props.members.currentItems.map(
      (member) => new MemberObject(member),
    );
    this.from = props.from.unpack();
    this.to = props.to.unpack();
  }
}
