import { Nullable } from '@lib/shared';

import {
  CreatePlaningMemberProps,
  PlaningMember,
} from './planing-member.entity';

export interface CreatePlaningMemberVoteProps extends CreatePlaningMemberProps {
  /**
   * Vote value of member for the task
   */
  vote: Nullable<number>;
}

export type PlaningMemberVoteProps = CreatePlaningMemberVoteProps;

/**
 * A member in a voting session, they will give a value for the task
 */
export class PlaningMemberVote extends PlaningMember<PlaningMemberVoteProps> {
  public get vote(): Nullable<number> {
    return this._props.vote;
  }

  public static create(props: PlaningMemberVoteProps) {
    return new PlaningMemberVote(props);
  }

  /**
   * Update vote value of the member for a task
   * @param value
   */
  public updateVote(value: number) {
    this._props.vote = value;
    this.update();
  }

  validate() {
    return;
  }
}
