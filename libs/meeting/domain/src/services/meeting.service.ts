import { Meeting, MeetingProps, Member } from '@lib/meeting/domain';
import { CUID, DateVO } from '@lib/shared';

export abstract class MeetingService<
  MeetingEntity extends Meeting<MeetingProps>,
> {
  /**
   * Create a meeting for a group
   * @param groupId
   * @param userId
   * @param title
   * @param from
   * @param to
   */
  public abstract create(
    groupId: CUID,
    userId: CUID,
    title: string,
    from: DateVO,
    to: DateVO,
  ): Promise<MeetingEntity>;

  /**
   * Add member into a meeting
   * @param meetingId
   * @param userId
   */
  public abstract addMember(meetingId: CUID, userId: CUID): Promise<Member>;
}
