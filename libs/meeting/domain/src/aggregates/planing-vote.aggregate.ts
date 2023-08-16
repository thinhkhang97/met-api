import { PlaningMemberRole } from '@lib/meeting/domain/constance';
import { MemberVoteNotFoundException } from '@lib/meeting/domain/exceptions';
import { OnlyVoterCanVoteRule } from '@lib/meeting/domain/rules';
import { AggregateRoot, CUID, Nullable, RuleValidator } from '@lib/shared';

import { PlaningMemberVote, PlaningTask } from '../entities';

interface CreatePlaningVote {
  /**
   * The task need to be voted
   */
  planingTask: PlaningTask;
  /**
   * The members attended to the vote
   */
  memberVotes: PlaningMemberVote[];

  /**
   * Final vote for the task
   */
  vote: Nullable<number>;
}

export type PlaningVoteProps = CreatePlaningVote;

export class PlaningVote extends AggregateRoot<PlaningVoteProps> {
  public get planingTask() {
    return this._props.planingTask;
  }

  public get memberVotes() {
    return this._props.memberVotes;
  }

  public static create(props) {
    return new PlaningVote(props);
  }

  /**
   * Update the vote value of a member for the task
   * @param memberVoteId
   * @param voteValue
   */
  public updateMemberVote(memberVoteId: CUID, voteValue: number) {
    const memberVote = this.memberVotes.find((mv) =>
      mv.id.equals(memberVoteId),
    );
    if (!memberVote) {
      throw new MemberVoteNotFoundException();
    }
    RuleValidator.validate(new OnlyVoterCanVoteRule(memberVote));
    memberVote.updateVote(voteValue);
    this.updateVote();
    this.update();
  }

  validate() {
    return;
  }

  /**
   * Update the average value of vote for the task
   * @private
   */
  private updateVote() {
    const voters = this.memberVotes.filter(
      (mv) => mv.type === PlaningMemberRole.VOTER,
    );
    if (voters.length === 0) {
      return;
    }
    let sum = 0;
    voters.forEach((voter) => (sum += voter.vote || 0));
    this._props.vote = sum / voters.length;
  }
}
