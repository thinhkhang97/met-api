import {
  Group,
  GroupExistedException,
  GroupRepository,
  GroupService,
} from '@lib/group/domain';
import { CUID } from '@lib/shared';
import { Injectable } from '@nestjs/common';

@Injectable()
export class GroupServiceImpl extends GroupService {
  constructor(private readonly _groupRepository: GroupRepository) {
    super();
  }

  async createGroup(
    name: string,
    ownerName: string,
    userId: CUID,
  ): Promise<Group> {
    const existedGroup = await this._groupRepository.findOne({
      name: name.toLowerCase(),
    });
    if (existedGroup) {
      throw new GroupExistedException();
    }
    const group = Group.create({
      userId,
      name,
      ownerName,
    });
    await this._groupRepository.save(group);
    return group;
  }
}
