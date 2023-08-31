import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject, Injectable } from '@nestjs/common';
import { Cache } from 'cache-manager';
import { remove } from 'lodash';
import { Socket } from 'socket.io';

import { MeetingCacheKey, RoomKey } from '../constance';
import { CachedMember, Member } from '../types';

@Injectable()
export class MeetingCache {
  constructor(@Inject(CACHE_MANAGER) protected readonly _cacheManager: Cache) {}

  async getMemberByClientId(clientId: string) {
    return await this._cacheManager.get<Member>(
      `${MeetingCacheKey.CLIENT_MEMBER}:${clientId}`,
    );
  }

  async addMemberToMeeting(client: Socket, meetingId: string, member: Member) {
    await this._cacheManager.set(
      `${MeetingCacheKey.CLIENT_MEMBER}:${client.id}`,
      member,
    );
    client.join(`${RoomKey.MEETING}:${meetingId}`);
  }

  async addMemberRequestJoin(meetingId: string, member: CachedMember) {
    const requestJoin = (await this.getMemberRequestJoin(meetingId)) || [];
    await this._cacheManager.set(
      `${MeetingCacheKey.MEMBER_REQUEST_JOIN}:${meetingId}`,
      [...requestJoin, member],
    );
  }

  async getMemberRequestJoin(meetingId: string) {
    return await this._cacheManager.get<CachedMember[]>(
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
