import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject, Injectable } from '@nestjs/common';
import { Cache } from 'cache-manager';
import { remove } from 'lodash';

import { MeetingCacheKey } from '../constance';
import { WSMember } from '../types';

@Injectable()
export class MeetingCache {
  constructor(@Inject(CACHE_MANAGER) protected readonly _cacheManager: Cache) {}

  async addMemberRequestJoin(meetingId: string, member: WSMember) {
    const requestJoin = (await this.getMemberRequestJoin(meetingId)) || [];
    await this._cacheManager.set(
      `${MeetingCacheKey.MEMBER_REQUEST_JOIN}:${meetingId}`,
      [...requestJoin, member],
    );
  }

  async getMemberRequestJoin(meetingId: string) {
    return await this._cacheManager.get<WSMember[]>(
      `${MeetingCacheKey.MEMBER_REQUEST_JOIN}:${meetingId}`,
    );
  }

  async getMemberRequestById(meetingId: string, memberId: string) {
    const requestMembers = (await this.getMemberRequestJoin(meetingId)) || [];
    const requestMember = remove(
      requestMembers,
      (_member) => _member.memberId === memberId,
    )[0];
    await this._cacheManager.set(
      `${MeetingCacheKey.MEMBER_REQUEST_JOIN}:${meetingId}`,
      requestMembers,
    );
    return requestMember;
  }
}
