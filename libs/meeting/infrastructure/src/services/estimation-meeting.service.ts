import {
  EstimationMeeting,
  EstimationMeetingRepository,
  EstimationMeetingService,
  GroupNotFoundException,
  GroupService,
  MeetingMemberNotFoundException,
  MeetingNotFoundException,
} from '@lib/meeting/domain';
import { CUID, DateVO } from '@lib/shared';
import { Injectable } from '@nestjs/common';

@Injectable()
export class EstimationMeetingServiceImpl implements EstimationMeetingService {
  constructor(
    private readonly _groupService: GroupService,
    private readonly _estimationMeetingRepository: EstimationMeetingRepository,
  ) {}

  async create(
    groupId: CUID,
    userId: CUID,
    title: string,
    from: DateVO,
    to: DateVO,
  ) {
    const group = await this._groupService.getGroupById(groupId, userId);
    if (!group) {
      throw new GroupNotFoundException();
    }
    const estimationMeeting = EstimationMeeting.create({
      groupId: group.id,
      title,
      from,
      to,
    });
    return await this._estimationMeetingRepository.create(estimationMeeting);
  }

  async addMember(meetingId: CUID, userId: CUID) {
    const meeting = await this._estimationMeetingRepository.findOneByIdOrThrow(
      meetingId,
      new MeetingNotFoundException(),
    );
    const groupMember = await this._groupService.getGroupMember(
      meeting.groupId,
      userId,
    );
    if (!groupMember) {
      throw new MeetingMemberNotFoundException();
    }
    const member = meeting.addMember(groupMember.id, groupMember.name);
    await this._estimationMeetingRepository.upsert(meeting);
    return member;
  }
}
