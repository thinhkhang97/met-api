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
   */
  public abstract getGroupById(id: CUID): Promise<Nullable<Group>>;

  /**
   * Get member information by id
   * @param memberId
   */
  public abstract getGroupMember(memberId: CUID): Promise<GroupMember>;
}
