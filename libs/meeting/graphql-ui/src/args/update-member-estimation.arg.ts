import { Nullable } from '@lib/shared';
import { ArgsType, Field, ID, Int } from '@nestjs/graphql';

@ArgsType()
export class UpdateMemberEstimationArg {
  @Field(() => ID)
  public meetingId!: string;

  @Field(() => ID)
  public meetingMemberId!: string;

  @Field(() => ID)
  public taskEstimationId!: string;

  @Field(() => Int, { nullable: true })
  public estimationValue!: Nullable<number>;

  @Field(() => String, { nullable: true })
  public reason!: Nullable<string>;
}
