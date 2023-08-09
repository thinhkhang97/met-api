import { Group } from '@lib/group/domain/aggregates';
import { CUID } from '@lib/shared';

export abstract class GroupService {
  abstract createGroup(
    name: string,
    ownerName: string,
    userId: CUID,
  ): Promise<Group>;

  abstract addMember(name: string, groupId: CUID, userId: CUID): Promise<Group>;
}
