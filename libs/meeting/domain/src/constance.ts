export enum TaskEstimationStatus {
  REMOVED,
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
