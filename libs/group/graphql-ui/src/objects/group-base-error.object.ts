import { BaseErrorObject } from '@lib/shared';
import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType('GroupBaseError')
export class GroupBaseErrorObject extends BaseErrorObject {
  @Field(() => String)
  public readonly status!: string;
}
