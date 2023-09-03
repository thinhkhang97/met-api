import {
  EstimationMeeting,
  EstimationMeetingRepository,
  EstimationMeetingService,
  GroupNotFoundException,
  GroupService,
  MeetingMemberNotFoundException,
  MeetingNotFoundException,
  TaskEstimationNotFoundException,
  TaskEstimationRepository,
} from '@lib/meeting/domain';
import { OnlyVoterCanEstimateRule } from '@lib/meeting/domain/rules';
import { CUID, DateVO, Nullable, RuleValidator } from '@lib/shared';
import { Injectable } from '@nestjs/common';

@Injectable()
export class EstimationMeetingServiceImpl implements EstimationMeetingService {
  constructor(
    private readonly _groupService: GroupService,
    private readonly _estimationMeetingRepository: EstimationMeetingRepository,
    private readonly _taskEstimationRepository: TaskEstimationRepository,
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
    return await this._estimationMeetingRepository.upsert(estimationMeeting);
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

  async removeMember(meetingId: CUID, memberId: CUID) {
    const meeting = await this._estimationMeetingRepository.findOneByIdOrThrow(
      meetingId,
      new MeetingNotFoundException(),
    );

    meeting.removeMember(memberId);
    await this._estimationMeetingRepository.upsert(meeting);
  }

  async updateMemberEstimation(
    meetingId: CUID,
    meetingMemberId: CUID,
    taskEstimationId: CUID,
    estimationValue: Nullable<number>,
  ) {
    const meeting = await this._estimationMeetingRepository.findOneByIdOrThrow(
      meetingId,
      new MeetingNotFoundException(),
    );
    const taskEstimation =
      await this._taskEstimationRepository.findOneByIdOrThrow(
        taskEstimationId,
        new TaskEstimationNotFoundException(),
      );
    if (!taskEstimation) {
      throw new TaskEstimationNotFoundException();
    }
    const member = meeting.members.findOneById(meetingMemberId);
    if (!member) {
      throw new MeetingMemberNotFoundException();
    }
    RuleValidator.validate(new OnlyVoterCanEstimateRule(member));
    taskEstimation.updateMemberEstimation(meetingMemberId, estimationValue);
    await this._taskEstimationRepository.upsert(taskEstimation);
  }
}
