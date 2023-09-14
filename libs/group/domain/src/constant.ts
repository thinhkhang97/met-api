export enum RoleName {
  /**
   * The most powerful role of a group
   * Take responsibility to manage roles and members in a group
   */
  OWNER = 'OWNER',
  MEMBER = 'MEMBER',
}

/**
 * Status of a member in group
 */
export enum MemberStatus {
  /**
   * The member was removed out of the group by the owner
   */
  REMOVED = 'REMOVED',
  /**
   * The member is already in the group
   */
  ACTIVE = 'ACTIVE',
  /**
   * The member walked out on the group
   */
  LEAVED = 'LEAVED',
  /**
   * The member is banned, he might not be added anymore
   */
  BANNED = 'BANNED',
}
