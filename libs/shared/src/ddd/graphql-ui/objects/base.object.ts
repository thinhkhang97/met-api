import { DateVO, ID } from '@lib/shared/ddd';
import {
  Field,
  GraphQLISODateTime,
  ID as GraphQLID,
  ObjectType,
} from '@nestjs/graphql';

@ObjectType({ isAbstract: true })
export abstract class BaseObject {
  @Field(() => GraphQLID)
  public readonly id: string;

  @Field(() => GraphQLISODateTime)
  public readonly updatedAt: Date;

  @Field(() => GraphQLISODateTime)
  public readonly createdAt: Date;

  constructor(props: { id: ID; updatedAt: DateVO; createdAt: DateVO }) {
    this.id = props.id.unpack();
    this.createdAt = props.createdAt.unpack();
    this.updatedAt = props.updatedAt.unpack();
  }
}
