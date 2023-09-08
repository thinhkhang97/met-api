import { BaseOrmMapper, Email } from '@lib/shared';
import { User, Username, UserProps, UserStatus } from '@lib/user/domain';
import { Password } from '@lib/user/domain/value-objects/password';
import { Injectable } from '@nestjs/common';

import { UserOrmEntity } from '../orm-entities';

@Injectable()
export class UserOrmMapper extends BaseOrmMapper<
  User,
  UserProps,
  UserOrmEntity
> {
  constructor() {
    super(User);
  }

  protected toEntityProps(ormEntity: UserOrmEntity): UserProps {
    return {
      email: new Email(ormEntity.email),
      name: new Username(ormEntity.name),
      password: new Password(ormEntity.password),
      status: ormEntity.status as UserStatus,
    };
  }

  protected toOrmProps(entity: User) {
    const props = entity.getProps();
    return {
      email: props.email.unpack(),
      name: props.name.unpack(),
      password: props.password.unpack(),
      status: props.status,
    };
  }
}
