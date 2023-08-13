import {
  Group,
  GroupExistedException,
  GroupNotFoundException,
  GroupRepository,
  GroupService,
  IdentityService,
  MemberExistedException,
  MemberRepository,
} from '@lib/group/domain';
import { CUID } from '@lib/shared';
import { Injectable } from '@nestjs/common';

@Injectable()
export class GroupServiceImpl extends GroupService {
  constructor(
    private readonly _groupRepository: GroupRepository,
    private readonly _memberRepository: MemberRepository,
    private readonly _identityService: IdentityService,
  ) {
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

  async addMember(name: string, groupId: CUID, userId: CUID): Promise<Group> {
    await this._identityService.getUserById(userId);
    await this.checkMemberExist(userId, groupId);
    const group = await this._groupRepository.findOneByIdOrThrow(
      groupId,
      new GroupNotFoundException(),
    );
    // group.addNewMember(name, userId);
    // await this._groupRepository.save(group);
    return group;
  }

  private async checkMemberExist(userId: CUID, groupId: CUID): Promise<void> {
    const member = await this._memberRepository.findOne({ userId, groupId });
    if (member) {
      throw new MemberExistedException();
    }
  }
}
