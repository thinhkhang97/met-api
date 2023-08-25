import { Meeting, MeetingProps } from '@lib/meeting/domain';
import { CUID, DateVO } from '@lib/shared';

export abstract class MeetingService<
  MeetingEntity extends Meeting<MeetingProps>,
> {
  public abstract create(
    groupId: CUID,
    userId: CUID,
    title: string,
    from: DateVO,
    to: DateVO,
  ): Promise<MeetingEntity>;
}
