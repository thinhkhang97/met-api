enum MemberRole {
  WATCHER = 'WATCHER',
  VOTER = 'VOTER',
}

export interface MemberDto {
  memberId: string;
  role: MemberRole;
  name: string;
  meetingId: string;
}
