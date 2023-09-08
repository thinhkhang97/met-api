import { CUID, Email } from '@lib/shared';

export interface User {
  id: CUID;
  name: string;
  email: string;
  status: number;
}

/**
 * The internal identity service
 */
export abstract class IdentityService {
  /**
   * Get the user information in the internal identity service
   * @param userId
   */
  public abstract getUserById(userId: CUID): Promise<User>;

  /**
   * Get the user information in the internal identity service by email
   * @param email
   */
  public abstract getUserByEmail(email: Email): Promise<User>;
}
