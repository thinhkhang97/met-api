import { AggregateRoot, Email, Nullable } from '@lib/shared';
import { Username } from '@lib/user/domain/value-objects';
import { Password } from '@lib/user/domain/value-objects/password';

export enum UserStatus {
  NEW,
  VERIFIED,
  IN_ACTIVE,
}

export type CreateUserProps = {
  email: Email;
  name: Nullable<Username>;
  password: Password;
};

export type UserProps = CreateUserProps & {
  status: UserStatus;
};

export class User extends AggregateRoot<UserProps> {
  get email() {
    return this._props.email;
  }

  get name(): Nullable<Username> {
    return this._props.name;
  }

  get password() {
    return this._props.password;
  }

  public static create(email: Email, password: Password) {
    return new User({
      email,
      password,
      name: null,
      status: UserStatus.NEW,
    });
  }

  validate() {
    return;
  }
}
