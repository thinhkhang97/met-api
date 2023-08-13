import { CUID } from '@lib/shared';

export interface User {
  id: CUID;
  name?: string;
  email: string;
}

export abstract class IdentityService {
  public abstract getUserById(userId: CUID): Promise<User>;
}
