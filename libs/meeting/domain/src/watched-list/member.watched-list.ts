import { Member } from '@lib/meeting/domain';
import { WatchedList } from '@lib/shared';

export class MemberWatchedList extends WatchedList<Member> {
  compare(member1: Member, member2: Member): boolean {
    return member1.equals(member2);
  }
}
