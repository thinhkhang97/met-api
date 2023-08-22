export enum TaskEstimationStatus {
  /**
   * Task removed, but it's soft removed
   */
  REMOVED,
  /**
   * The task still in the estimation meeting
   */
  ACTIVE,
}

export enum MemberRole {
  /**
   * Only watch the process
   */
  WATCHER,
  /**
   * Vote the point for the ticket
   */
  VOTER,
}

export enum MemberStatus {
  /**
   * Member left the meeting or added by someone but not present at the time
   */
  OFFLINE,
  /**
   * Member still in the meeting
   */
  ONLINE,
}

export enum MeetingStatus {
  /**
   * All the member left the meeting
   */
  ENDED,
  /**
   * The meeting is happening
   */
  ACTIVE,
}
