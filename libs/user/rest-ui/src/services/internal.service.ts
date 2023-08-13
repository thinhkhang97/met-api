import { Either } from '@lib/shared';
import { GetUserQuery } from '@lib/user/application/queries';
import { User, UserNotFoundException } from '@lib/user/domain';
import { Injectable } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';

@Injectable()
export class InternalService {
  constructor(private readonly _queryBus: QueryBus) {}

  public async getUserById(userId: string) {
    const result = await this._queryBus.execute<GetUserQuery, Either<User>>(
      new GetUserQuery({ userId }),
    );

    if (result.isErr()) {
      throw new UserNotFoundException();
    }

    const user = result.unwrap().getProps();

    return {
      id: user.id.unpack(),
      email: user.email.unpack(),
      status: user.status,
    };
  }
}
