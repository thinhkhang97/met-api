import { PlaningMemberRole } from '@lib/meeting/domain/constance';
import { BaseRule } from '@lib/shared';

import { PlaningMember } from '../entities';

export class OnlyVoterCanVoteRule extends BaseRule {
  constructor(private readonly _member: PlaningMember) {
    super();
  }

  getErrorMessage(): string {
    return 'only_voter_can_vote';
  }

  isFailed(): boolean {
    return this._member.type !== PlaningMemberRole.VOTER;
  }
}
