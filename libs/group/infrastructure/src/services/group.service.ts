import {
  Group,
  GroupExistedException,
  GroupNotFoundException,
  GroupRepository,
  GroupService,
  IdentityService,
  Member,
  MemberNotFoundException,
  MemberRepository,
} from '@lib/group/domain';
import { CUID, Nullable } from '@lib/shared';
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

  async addMember(
    name: string,
    groupId: CUID,
    userId: CUID,
    newMemberUserId: CUID,
  ): Promise<Group> {
    const group = await this._groupRepository.findOneByIdOrThrow(
      groupId,
      new GroupNotFoundException(),
    );
    const member = await this._memberRepository.findOne({ userId, groupId });
    if (!member) {
      throw new MemberNotFoundException();
    }
    const newMemberUserInfo = await this._identityService.getUserById(
      newMemberUserId,
    );

    const existMember = await this.getMemberByUserId(newMemberUserId, groupId);
    if (!existMember) {
      group.addNewMember(name, newMemberUserInfo.id, member);
    } else {
      existMember.updateName(name);
      group.reactivateMember(existMember, member);
    }
    await this._groupRepository.save(group);
    return group;
  }

  public async removeMember(
    groupId: CUID,
    memberId: CUID,
    byMemberUserId: CUID,
  ) {
    const group = await this._groupRepository.findOneByIdOrThrow(
      groupId,
      new GroupNotFoundException(),
    );
    const member = await this._memberRepository.findOne({
      id: memberId,
      groupId: groupId,
    });
    const byMember = await this._memberRepository.findOne({
      userId: byMemberUserId,
      groupId,
    });

    if (!member || !byMember) {
      throw new MemberNotFoundException();
    }

    group.removeMember(member, byMember);
    await this._groupRepository.save(group);
  }

  private async getMemberByUserId(
    userId: CUID,
    groupId: CUID,
  ): Promise<Nullable<Member>> {
    return await this._memberRepository.findOne({
      userId,
      groupId,
    });
  }
}
