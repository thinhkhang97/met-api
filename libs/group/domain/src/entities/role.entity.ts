import { RoleName } from '@lib/group/domain/constant';
import { BaseEntity, CUID } from '@lib/shared';

type CreateRoleProps = { name: string; groupId: CUID };

export type RoleProps = CreateRoleProps;

export class Role extends BaseEntity<RoleProps> {
  public get name() {
    return this._props.name;
  }

  public static forCasual(groupId: CUID) {
    return [
      new Role({ name: RoleName.OWNER, groupId }),
      new Role({ name: RoleName.MEMBER, groupId }),
    ];
  }

  public static getOwner(roles: Role[]) {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    return roles.find((role) => role.name === RoleName.OWNER)!;
  }

  public static getMember(roles: Role[]) {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    return roles.find((role) => role.name === RoleName.MEMBER)!;
  }

  validate() {
    return;
  }
}
