import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType('UserMutationResult')
export class UserMutationResultObject {
  @Field(() => String, { nullable: true })
  public readonly errorMessage?: string;

  @Field(() => String)
  public readonly status: string;

  constructor(props: { errorMessage?: string; status: string }) {
    this.errorMessage = props.errorMessage;
    this.status = props.status;
  }
}
