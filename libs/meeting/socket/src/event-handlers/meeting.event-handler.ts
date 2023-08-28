import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject, Injectable } from '@nestjs/common';
import { Cache } from 'cache-manager';
import { Socket } from 'socket.io';

import { EventHandlerResult, Meeting, Member } from '../types';

@Injectable()
export class MeetingEventHandler {
  constructor(@Inject(CACHE_MANAGER) protected readonly _cacheManager: Cache) {}

  public async handleMemberJoinMeeting(
    data: { meetingId: string; memberId: string },
    client: Socket,
  ): Promise<EventHandlerResult<Member>> {
    await this._cacheManager.set(`client_${client.id}`, {
      meetingId: data.meetingId,
    });
    let meeting = await this._cacheManager.get<Meeting>(
      `meeting_${data.meetingId}`,
    );
    const member = {
      memberId: data.memberId,
      clientId: client.id,
    };
    if (!meeting) {
      meeting = {
        id: data.meetingId,
        members: [member],
      };
    } else {
      meeting.members?.push(member);
    }
    client.join(`meeting_${data.meetingId}`);
    await this._cacheManager.set(`meeting_${data.meetingId}`, meeting);
    return {
      room: `meeting_${meeting.id}`,
      message: `member_joined`,
      data: member,
    };
  }

  public async handleMemberLeftMeeting(
    client: Socket,
  ): Promise<EventHandlerResult<Member> | undefined> {
    const clientData = await this._cacheManager.get<{ meetingId?: string }>(
      `client_${client.id}`,
    );
    if (!clientData || !clientData.meetingId) {
      return;
    }
    const meeting = await this._cacheManager.get<Meeting>(
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
