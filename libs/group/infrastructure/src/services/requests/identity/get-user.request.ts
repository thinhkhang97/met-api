import { BaseRequest } from '@lib/shared/ddd/rest-ui';

export interface GetUserResponse {
  id: string;
  email: string;
  status: number;
  name: string;
}

export class GetUserRequest extends BaseRequest {
  constructor(id: string) {
    super('internal/user', 'GET');
    this.withParams({ id });
  }
}
