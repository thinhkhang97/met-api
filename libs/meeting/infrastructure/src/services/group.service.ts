import { Group, GroupMember, GroupService } from '@lib/meeting/domain';
import { GROUP_INTERNAL_SERVICE } from '@lib/meeting/infrastructure/constance';
import { CUID, Nullable } from '@lib/shared';
import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class GroupServiceImpl implements GroupService {
  constructor(
    @Inject(GROUP_INTERNAL_SERVICE)
    private readonly groupInternalClient: ClientProxy,
  ) {}

  async getGroupById(id: CUID, userId: CUID): Promise<Nullable<Group>> {
    const result = await this.groupInternalClient.send(
      { action: 'get-group-by-id' },
      { groupId: id.unpack(), userId: userId.unpack() },
    );
    const data = await firstValueFrom<{ id: string; name: string }>(result);
    if (!data) {
      return null;
    }
    return {
      id: new CUID(data.id),
      name: data.name,
    };
  }

  async getGroupMember(
    groupId: CUID,
    userId: CUID,
  ): Promise<Nullable<GroupMember>> {
    const result = await this.groupInternalClient.send(
      { action: 'get-member-by-user-id' },
      { groupId: groupId.unpack(), userId: userId.unpack() },
    );
    const data = await firstValueFrom<{ id: string; name: string }>(result);
    if (!data) {
      return null;
    }
    return {
      id: new CUID(data.id),
      name: data.name,
    };
  }
}
