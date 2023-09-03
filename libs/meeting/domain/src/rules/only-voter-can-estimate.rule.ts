import { BaseRule } from '@lib/shared';

import { MemberRole } from '../constance';
import { Member } from '../entities';

export class OnlyVoterCanEstimateRule extends BaseRule {
  constructor(private readonly _member: Member) {
    super();
  }

  getErrorMessage(): string {
    return 'only_voter_can_estimate';
  }

  isFailed(): boolean {
    console.log(this._member);
    return this._member.role !== MemberRole.VOTER;
  }
}
