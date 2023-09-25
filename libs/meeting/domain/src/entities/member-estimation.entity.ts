import { BaseEntity, CUID, Nullable } from '@lib/shared';

export interface CreateMemberEstimationProps {
  /**
   * ID of member in the meeting
   */
  meetingMemberId: CUID;

  /**
   * Estimation value of member for the task
   */
  estimation: Nullable<number>;

  /**
   * task estimation id
   */
  taskEstimationId: CUID;

  /**
   * Reason for the estimation
   */
  reason: Nullable<string>;
}

export type MemberEstimationProps = CreateMemberEstimationProps;

/**
 * A member in an estimation session, they will give a point value or hours for the task
 */
export class MemberEstimation extends BaseEntity<MemberEstimationProps> {
  public get meetingMemberId() {
    return this._props.meetingMemberId;
  }

  public get estimation(): Nullable<number> {
    return this._props.estimation;
  }

  public static create(props: CreateMemberEstimationProps) {
    return new MemberEstimation(props);
  }

  /**
   * Reset member estimation for the task
   */
  public resetEstimation() {
    this._props.estimation = null;
  }

  /**
   * Update estimation value of the member for a task
   * @param value
   * @param reason
   */
  public updateEstimation(value: Nullable<number>, reason: Nullable<string>) {
    this._props.estimation = value;
    this._props.reason = reason;
    this.update();
  }

  validate() {
    return;
  }
}
