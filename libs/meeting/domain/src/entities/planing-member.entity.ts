import { BaseEntity, CUID } from '@lib/shared';

import { PlaningMemberRole } from '../constance';

export interface CreatePlaningMemberProps {
  /**
   * Member's id in the group
   */
  memberId: CUID;
  /**
   * Type of member in the planing meeting
   */
  type: PlaningMemberRole;
  /**
   * Name of member in group
   */
  name: string;
}

export type PlaningMemberProps = CreatePlaningMemberProps;

/**
 * A member in a planing meeting
 */
export class PlaningMember<
  PM extends PlaningMemberProps = PlaningMemberProps,
> extends BaseEntity<PM> {
  get type() {
    return this._props.type;
  }

  public static create(props: PlaningMemberProps) {
    return new PlaningMember(props);
  }

  validate() {
    return;
  }
}
