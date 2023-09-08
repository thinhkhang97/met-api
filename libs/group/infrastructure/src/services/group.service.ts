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
import { CUID, Email, Nullable } from '@lib/shared';
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
    userId: CUID,
    name: string,
    description: Nullable<string>,
  ): Promise<Group> {
    const existedGroup = await this._groupRepository.findOne({
      name: name.toLowerCase(),
    });
    if (existedGroup) {
      throw new GroupExistedException();
    }
    const user = await this._identityService.getUserById(userId);
    const group = Group.create({
      userId,
      name,
      ownerName: user.name,
      description,
    });
    await this._groupRepository.upsert(group);
    return group;
  }

  async addMember(groupId: CUID, userId: CUID, email: Email): Promise<Member> {
    const group = await this._groupRepository.findOneByIdOrThrow(
      groupId,
      new GroupNotFoundException(),
    );
    const member = await this._memberRepository.findOne({ userId, groupId });
    if (!member) {
      throw new MemberNotFoundException();
    }
    const newMemberUserInfo = await this._identityService.getUserByEmail(email);

    let newMember = await this.getMemberByUserId(newMemberUserInfo.id, groupId);
    if (!newMember) {
      newMember = group.addNewMember(
        newMemberUserInfo.name,
        newMemberUserInfo.id,
        member,
      );
    } else {
      newMember.updateName(newMemberUserInfo.name);
      group.reactivateMember(newMember, member);
    }
    await this._groupRepository.upsert(group);
    return newMember;
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
    await this._groupRepository.upsert(group);
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
