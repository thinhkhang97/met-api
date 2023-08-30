import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Cache } from 'cache-manager';
import { Server, Socket } from 'socket.io';

import { MeetingCache, UserCache } from '../cache';
import { EventName, MEETING_INTERNAL_SERVICE, RoomKey } from '../constance';
import { EventHandlerResult, Member, WMeeting, WSMember } from '../types';

@Injectable()
export class MeetingEventHandler {
  constructor(
    @Inject(CACHE_MANAGER) protected readonly _cacheManager: Cache,
    private readonly _meetingCache: MeetingCache,
    @Inject(MEETING_INTERNAL_SERVICE)
    private readonly _meetingInternalService: ClientProxy,
    private readonly _userCache: UserCache,
  ) {}

  public async handleMemberJoinMeeting(meetingId: string, member: WSMember) {
    const user = await this._userCache.findOneByClientId(member.clientId);
    if (!user) {
      return;
    }
    await this._meetingCache.addMemberRequestJoin(meetingId, member);
  }

  public async handleMemberJoined(
    meetingId: string,
    member: Member,
    server: Server,
  ) {
    const requestMember = await this._meetingCache.getMemberRequestById(
      meetingId,
      member.memberId,
    );
    if (!requestMember) {
      return;
    }
    const client = server.sockets.sockets.get(requestMember.clientId);
    if (!client) {
      return;
    }
    client.join(`${RoomKey.MEETING}:${meetingId}`);
    server
      .to(`${RoomKey.MEETING}:${meetingId}`)
      .emit(
        `${RoomKey.MEETING}:${meetingId}:${EventName.MEMBER_JOINED}`,
        member,
      );
  }

  public async handleMemberLeftMeeting(
    client: Socket,
  ): Promise<EventHandlerResult<WSMember> | undefined> {
    const clientData = await this._cacheManager.get<{ meetingId?: string }>(
      `client_${client.id}`,
    );
    if (!clientData || !clientData.meetingId) {
      return;
    }
    const meeting = await this._cacheManager.get<WMeeting>(
      `meeting_${clientData.meetingId}`,
    );
    const leavedMemberIndex =
      meeting?.members.findIndex((member) => member.clientId === client.id) ||
      -1;
    const leftMember = meeting?.members.splice(leavedMemberIndex, 1)[0];
    if (!leftMember) {
      return;
    }
    client.leave(`meeting_${meeting.id}`);
    await this._cacheManager.set(`meeting_${meeting?.id}`, meeting);
    return {
      room: `meeting_${meeting.id}`,
      message: `member_left`,
      data: leftMember,
    };
  }
}
