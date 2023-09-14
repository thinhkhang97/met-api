export enum TaskEstimationStatus {
  /**
   * Task removed, but it's soft removed
   */
  REMOVED = 'REMOVED',
  /**
   * The task still in the estimation meeting
   */
  ACTIVE = 'ACTIVE',
  /**
   * The estimation session is still ongoing
   */
  IN_ESTIMATING = 'IN_ESTIMATING',
  /**
   * The estimation session is over
   */
  ESTIMATED = 'ESTIMATED',
}

export enum MemberRole {
  /**
   * Only watch the process
   */
  WATCHER = 'WATCHER',
  /**
   * Vote the point for the ticket
   */
  VOTER = 'VOTER',
}

export enum MemberStatus {
  /**
   * Member left the meeting or added by someone but not present at the time
   */
  LEFT = 'LEFT',
  /**
   * Member still in the meeting
   */
  ACTIVE = 'ACTIVE',
}

export enum MeetingStatus {
  /**
   * All the member left the meeting
   */
  ENDED = 'ENDED',
  /**
   * The meeting is happening
   */
  ACTIVE = 'ACTIVE',
}

export enum EstimationMeetingStatus {
  /**
   * All the member left the meeting
   */
  ENDED = 'ENDED',
  /**
   * Everyone is discussing a task
   */
  ACTIVE = 'ACTIVE',
  /**
   * The estimation session is still ongoing
   */
  IN_ESTIMATING = 'IN_ESTIMATING',
}
