import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject, Injectable } from '@nestjs/common';
import { Cache } from 'cache-manager';

import { MeetingCacheKey } from '../constance';
import { CachedMember, Member } from '../types';

@Injectable()
export class MeetingCache {
  constructor(@Inject(CACHE_MANAGER) protected readonly _cacheManager: Cache) {}

  async getMemberByClientId(clientId: string) {
    return await this._cacheManager.get<Member>(
      `${MeetingCacheKey.CLIENT_MEMBER}:${clientId}`,
    );
  }

  async removeMemberByClientId(clientId: string) {
    return await this._cacheManager.del(
      `${MeetingCacheKey.CLIENT_MEMBER}:${clientId}`,
    );
  }

  async addMemberToMeeting(clientId, meetingId: string, member: Member) {
    await this._cacheManager.set(
      `${MeetingCacheKey.CLIENT_MEMBER}:${clientId}`,
      member,
    );
  }

  async addMemberRequestJoin(meetingId: string, member: CachedMember) {
    await this._cacheManager.set(
      `${MeetingCacheKey.MEMBER_REQUEST_JOIN}:${meetingId}:${member.memberId}`,
      member,
    );
  }

  async getMemberRequestJoin(meetingId: string, memberId: string) {
    return await this._cacheManager.get<CachedMember>(
      `${MeetingCacheKey.MEMBER_REQUEST_JOIN}:${meetingId}:${memberId}`,
    );
  }
}
