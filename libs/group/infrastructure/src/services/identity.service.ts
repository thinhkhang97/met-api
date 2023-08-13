import { IdentityService, User } from '@lib/group/domain';
import { CUID } from '@lib/shared';
import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class IdentityServiceImpl implements IdentityService {
  private readonly domainURL: string;

  constructor(
    private readonly _configService: ConfigService,
    private readonly _httpService: HttpService,
  ) {
    this.domainURL = `${this._configService.getOrThrow<string>(
      'IDENTITY_INTERNAL_SERVICE',
    )}/internal/user`;
  }

  public async getUserById(userId: CUID): Promise<User> {
    await this._httpService.axiosRef.request({
      url: `${this.domainURL}/${userId.unpack()}`,
      headers: {
        'x-internal-api-key':
          this._configService.getOrThrow('INTERNAL_API_KEY'),
      },
    });
    return { id: CUID.generate(), name: 'test', email: 'test' };
  }
}
