import { MemberEstimation } from '@lib/meeting/domain';
import { CUID, WatchedList } from '@lib/shared';

export class MemberEstimationWatchedList extends WatchedList<MemberEstimation> {
  public get sumVoterValue() {
    let sum = 0;
    this.currentItems.forEach(
      (memberEstimation) => (sum += memberEstimation.estimation || 0),
    );
    return sum;
  }

  public get numberOfValue() {
    return this.currentItems.filter(
      (memberEstimation) => (memberEstimation.estimation || 0) > 0,
    ).length;
  }

  public findOneByMeetingMemberId(meetingMemberId: CUID) {
    return this.currentItems.find((member) =>
      member.meetingMemberId.equals(meetingMemberId),
    );
  }

  compare(item1: MemberEstimation, item2: MemberEstimation): boolean {
    return item1.equals(item2);
  }
}
