import { RoleName } from '@lib/group/domain/constant';
import { BaseEntity, CUID } from '@lib/shared';

type CreateRoleProps = { name: RoleName; groupId: CUID };

export type RoleProps = CreateRoleProps;

/**
 * Roles in a group
 */
export class Role extends BaseEntity<RoleProps> {
  public get name() {
    return this._props.name;
  }

  /**
   * Create necessary roles for a casual group
   * @param groupId
   */
  public static forCasual(groupId: CUID) {
    return [
      new Role({ name: RoleName.OWNER, groupId }),
      new Role({ name: RoleName.MEMBER, groupId }),
    ];
  }

  /**
   * Get owner role
   * @param roles
   */
  public static getOwner(roles: Role[]) {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    return roles.find((role) => role.name === RoleName.OWNER)!;
  }

  /**
   * Get member role
   * @param roles
   */
  public static getMember(roles: Role[]) {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    return roles.find((role) => role.name === RoleName.MEMBER)!;
  }

  validate() {
    return;
  }
}
