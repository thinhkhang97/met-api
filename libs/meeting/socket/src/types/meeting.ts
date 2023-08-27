enum MemberRole {
  WATCHER = 'WATCHER',
  VOTER = 'VOTER',
}

export interface Member {
  memberId: string;
  role?: MemberRole;
  name?: string;
  clientId: string;
}

export interface Meeting {
  id: string;
  members: Member[];
}
