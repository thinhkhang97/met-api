import { Nullable } from '@lib/shared';
import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType({ isAbstract: true })
export abstract class BaseResultObject {
  @Field(() => String, { nullable: true })
  public readonly errorMessage: Nullable<string>;

  @Field(() => String)
  public readonly status: string;

  constructor(status: string, errorMessage: Nullable<string> = null) {
    this.errorMessage = errorMessage;
    this.status = status;
  }
}
