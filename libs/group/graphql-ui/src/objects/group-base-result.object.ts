import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType('GroupBaseResult')
export class GroupBaseResultObject {
  @Field(() => String)
  public readonly status!: string;

  @Field(() => String, { nullable: true })
  public readonly errorMessage?: string;
}
