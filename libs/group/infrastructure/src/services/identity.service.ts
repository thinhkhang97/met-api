import { IdentityService, User } from '@lib/group/domain';
import { CUID, Email, IdentityHttpService } from '@lib/shared';
import { UserNotFoundException } from '@lib/user/domain';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import {
  GetUserByEmailRequest,
  GetUserRequest,
  GetUserResponse,
} from './requests';

@Injectable()
export class IdentityServiceImpl implements IdentityService {
  constructor(
    private readonly _configService: ConfigService,
    private readonly _identityHttpService: IdentityHttpService,
  ) {}

  public async getUserById(userId: CUID): Promise<User> {
    const response = await this._identityHttpService.send<GetUserResponse>(
      new GetUserRequest(userId.unpack()),
    );
    if (response.isErr()) {
      throw new UserNotFoundException();
    }
    const data = response.unwrap();
    return {
      id: new CUID(data.id),
      email: data.email,
      status: data.status,
    };
  }

  public async getUserByEmail(email: Email): Promise<User> {
    const response = await this._identityHttpService.send<GetUserResponse>(
      new GetUserByEmailRequest(email.unpack()),
    );
    if (response.isErr()) {
      throw new UserNotFoundException();
    }
    const data = response.unwrap();
    return {
      id: new CUID(data.id),
      email: data.email,
      status: data.status,
    };
  }
}
