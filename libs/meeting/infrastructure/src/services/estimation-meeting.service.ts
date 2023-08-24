import {
  EstimationMeeting,
  EstimationMeetingRepository,
  GroupNotFoundException,
  GroupService,
} from '@lib/meeting/domain';
import { CUID } from '@lib/shared';
import { Injectable } from '@nestjs/common';

@Injectable()
export class EstimationMeetingService {
  constructor(
    private readonly _groupService: GroupService,
    private readonly _estimationMeetingRepository: EstimationMeetingRepository,
  ) {}

  async create(groupId: CUID, title: string) {
    const group = await this._groupService.getGroupById(groupId);
    if (!group) {
      throw new GroupNotFoundException();
    }
    const estimationMeeting = EstimationMeeting.create({
      groupId: group.id,
      title,
    });
    return await this._estimationMeetingRepository.create(estimationMeeting);
  }

  // async addMember(meetingId: CUID, memberId: CUID) {
  //   const groupMember = await this._groupService.getGroupMember(memberId);
  //   const meeting = await this._estimationMeetingRepository.findOneByIdOrThrow(
  //     meetingId,
  //     new MeetingNotFoundException(),
  //   );
  //   meeting.addMember(memberId, groupMember.name);
  //   return await this._estimationMeetingRepository.create(meeting);
  // }
}
