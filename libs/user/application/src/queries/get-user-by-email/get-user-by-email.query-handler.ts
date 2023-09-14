import { BaseQueryHandler, Email } from '@lib/shared';
import { User, UserNotFoundException, UserRepository } from '@lib/user/domain';
import { QueryHandler } from '@nestjs/cqrs';

import { GetUserByEmailQuery } from './get-user-by-email.query';

@QueryHandler(GetUserByEmailQuery)
export class GetUserByEmailQueryHandler extends BaseQueryHandler<
  GetUserByEmailQuery,
  User
> {
  constructor(private readonly _userRepository: UserRepository) {
    super();
  }

  protected async handle(query: GetUserByEmailQuery): Promise<User> {
    const user = await this._userRepository.findOne({
      email: new Email(query.email),
    });

    if (!user) {
      throw new UserNotFoundException();
    }

    return user;
  }
}
