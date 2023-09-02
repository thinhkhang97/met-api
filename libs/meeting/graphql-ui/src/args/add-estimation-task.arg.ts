import { Nullable } from '@lib/shared';
import { ArgsType, Field, ID } from '@nestjs/graphql';

@ArgsType()
export class AddEstimationTaskArg {
  @Field(() => ID)
  public readonly memberId!: string;

  @Field(() => ID)
  public readonly meetingId!: string;

  @Field(() => String)
  public readonly title!: string;

  @Field(() => String, { nullable: true })
  public readonly description!: Nullable<string>;
}
