import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Server, Socket } from 'socket.io';

import { MeetingCache, UserCache } from '../cache';
import {
  MEETING_INTERNAL_SERVICE,
  MeetingMessageName,
  RoomKey,
} from '../constance';
import { CachedMember, Member } from '../types';

@Injectable()
export class MeetingEventHandler {
  constructor(
    private readonly _meetingCache: MeetingCache,
    @Inject(MEETING_INTERNAL_SERVICE)
    private readonly _meetingInternalService: ClientProxy,
    private readonly _userCache: UserCache,
  ) {}

  public async handleMemberJoinMeeting(
    meetingId: string,
    member: CachedMember,
  ) {
    const user = await this._userCache.findOneByClientId(member.clientId);
    if (!user) {
      return;
    }
    await this._meetingCache.addMemberRequestJoin(meetingId, member);
  }

  public async handleMemberJoined(member: Member, server: Server) {
    const { meetingId, memberId } = member;
    const requestMember = await this._meetingCache.getMemberRequestJoin(
      meetingId,
      memberId,
    );
    if (!requestMember) {
      return;
    }
    const client = server.of('/').sockets.get(requestMember.clientId);
    if (!client) {
      return;
    }
    await this._meetingCache.addMemberToMeeting(
      client.id,
      meetingId,
      requestMember,
    );
    await client.join(`${RoomKey.MEETING}:${meetingId}`);
    server
      .to(`${RoomKey.MEETING}:${meetingId}`)
      .emit(MeetingMessageName.MEMBER_JOINED, member);
  }

  public async handleMemberLeaveMeeting(client: Socket, server: Server) {
    const member = await this._meetingCache.getMemberByClientId(client.id);
    if (!member) {
      return;
    }
    this._meetingInternalService.emit(
      { action: 'member-leave' },
      {
        memberId: member.memberId,
        meetingId: member.meetingId,
      },
    );
    await client.leave(`${RoomKey.MEETING}:${member.meetingId}`);
    server
      .to(`${RoomKey.MEETING}:${member.meetingId}`)
      .emit(MeetingMessageName.MEMBER_LEFT, member);
    this._meetingCache.removeMemberByClientId(client.id);
  }
}
