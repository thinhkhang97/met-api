import { Either, GraphQLUser, LoggedUser, Public } from '@lib/shared';
import { GetUserQuery } from '@lib/user/application/queries';
import { User } from '@lib/user/domain';
import { UserObject } from '@lib/user/graphql-ui/objects/user.object';
import { QueryBus } from '@nestjs/cqrs';
import { Query, Resolver } from '@nestjs/graphql';

import { UserResult } from '../unions/user-result.union';

@Resolver()
export class UserQuery {
  constructor(public readonly _queryBus: QueryBus) {}

  @Public()
  @Query(() => String, { name: 'helloworld' })
  public getHelloWorld() {
    return 'hello world';
  }

  @Query(() => UserResult, { name: 'user' })
  public async getUserByIdQuery(@GraphQLUser() loggedUser: LoggedUser) {
    const result = await this._queryBus.execute<GetUserQuery, Either<User>>(
      new GetUserQuery({ userId: loggedUser.id }),
    );
    if (result.isErr()) {
      return {
        errorMessage: result.unwrapErr().message,
      };
    }

    return new UserObject(result.unwrap());
  }
}
