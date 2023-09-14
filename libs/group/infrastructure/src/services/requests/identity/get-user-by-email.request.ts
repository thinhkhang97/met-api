import { BaseRequest } from '@lib/shared/ddd/rest-ui';

export class GetUserByEmailRequest extends BaseRequest {
  constructor(email: string) {
    super('internal/user-by-email', 'GET');
    this.withParams({ email });
  }
}
