import { CUID } from '@lib/shared';

export interface User {
  id: CUID;
  name?: string;
  email: string;
  status: number;
}

export abstract class IdentityService {
  public abstract getUserById(userId: CUID): Promise<User>;
}
