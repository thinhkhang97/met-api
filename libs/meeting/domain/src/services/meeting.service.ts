import { Meeting, MeetingProps, Member } from '@lib/meeting/domain';
import { CUID, DateVO, Nullable } from '@lib/shared';

export abstract class MeetingService<
  MeetingEntity extends Meeting<MeetingProps>,
> {
  /**
   * Create a meeting for a group
   * @param groupId
   * @param userId
   * @param title
   * @param description
   * @param from
   * @param to
   */
  public abstract create(
    groupId: CUID,
    userId: CUID,
    title: string,
    description: Nullable<string>,
    from: DateVO,
    to: DateVO,
  ): Promise<MeetingEntity>;

  /**
   * Add member into a meeting
   * @param meetingId
   * @param userId
   */
  public abstract addMember(meetingId: CUID, userId: CUID): Promise<Member>;

  /**
   * Remove a member out of the meeting
   * @param meetingId
   * @param memberId
   */
  public abstract removeMember(meetingId: CUID, memberId: CUID): Promise<void>;
}
