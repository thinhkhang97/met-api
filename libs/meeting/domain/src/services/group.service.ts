import { CUID, Nullable } from '@lib/shared';

export type Group = {
  id: CUID;
  name: string;
};

export type GroupMember = {
  id: CUID;
  name: string;
};

/**
 *Group internal service
 */
export abstract class GroupService {
  /**
   * Get group information by id
   * @param id
   * @param userId
   */
  public abstract getGroupById(
    id: CUID,
    userId: CUID,
  ): Promise<Nullable<Group>>;

  /**
   * Get member information by id
   * @param groupId
   * @param userId
   */
  public abstract getGroupMember(
    groupId: CUID,
    userId: CUID,
  ): Promise<Nullable<GroupMember>>;
}
