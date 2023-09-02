import { Member } from '@lib/meeting/domain';
import { CUID, WatchedList } from '@lib/shared';

export class MemberWatchedList extends WatchedList<Member> {
  findOneByMemberId(memberId: CUID) {
    return this.currentItems.find((member) => member.memberId.equals(memberId));
  }

  compare(member1: Member, member2: Member): boolean {
    return member1.equals(member2);
  }
}
