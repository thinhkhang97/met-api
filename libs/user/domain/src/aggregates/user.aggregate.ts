import { AggregateRoot, Email, Nullable } from '@lib/shared';
import { Username } from '@lib/user/domain/value-objects';
import { Password } from '@lib/user/domain/value-objects/password';

export enum UserStatus {
  NEW = 'NEW',
  VERIFIED = 'VERIFIED',
  IN_ACTIVE = 'IN_ACTIVE',
}

export type CreateUserProps = {
  email: Email;
  name: Username;
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
    const name = new Username(email.getFirstPath());
    return new User({
      email,
      password,
      name,
      status: UserStatus.NEW,
    });
  }

  public updateName(name: Username) {
    this._props.name = name;
    this.update();
  }

  validate() {
    return;
  }
}
