import { Group } from '@lib/group/domain/aggregates';
import { Member } from '@lib/group/domain/entities';
import { CUID, Email, Nullable } from '@lib/shared';

export abstract class GroupService {
  /**
   * Create a new group and assign the user to be the group owner
   * @param name Group name
   * @param userId
   * @param description
   */
  abstract createGroup(
    userId: CUID,
    name: string,
    description: Nullable<string>,
  ): Promise<Group>;

  /**
   * Add a new member into the group
   * @param groupId
   * @param userId
   * @param email User email
   */
  abstract addMember(
    groupId: CUID,
    userId: CUID,
    email: Email,
  ): Promise<Member>;

  /**
   * Remove a member out of the group by group owner
   * @param groupId
   * @param memberId
   * @param byMemberId
   */
  abstract removeMember(groupId: CUID, memberId: CUID, byMemberId: CUID);
}
