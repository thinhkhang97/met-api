import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject, Injectable } from '@nestjs/common';
import { Cache } from 'cache-manager';

import { EventHandlerResult, Meeting, Member } from '../types';

@Injectable()
export class MeetingEventHandler {
  constructor(@Inject(CACHE_MANAGER) protected readonly _cacheManager: Cache) {}

  public async handleMemberJoinMeeting(
    data: { meetingId: string; memberId: string },
    clientId: string,
  ): Promise<EventHandlerResult<Meeting>> {
    await this._cacheManager.set(`client_${clientId}`, {
      meetingId: data.meetingId,
    });
    let meeting = await this._cacheManager.get<Meeting>(
      `meeting_${data.meetingId}`,
    );
    if (!meeting) {
      meeting = {
        id: data.meetingId,
        members: [
          {
            memberId: data.memberId,
            clientId,
          },
        ],
      };
    } else {
      meeting.members?.push({ memberId: data.meetingId, clientId });
    }
    await this._cacheManager.set(`meeting_${data.meetingId}`, meeting);
    return {
      emitMessage: `meeting:${meeting.id}_member_joined}`,
      data: meeting,
    };
  }

  public async handleMemberLeftMeeting(
    clientId: string,
  ): Promise<EventHandlerResult<Member> | undefined> {
    const clientData = await this._cacheManager.get<{ meetingId?: string }>(
      `client_${clientId}`,
    );
    if (!clientData || !clientData.meetingId) {
      return;
    }
    const meeting = await this._cacheManager.get<Meeting>(
      `meeting_${clientData.meetingId}`,
    );
    const leavedMemberIndex =
      meeting?.members.findIndex((member) => member.clientId === clientId) ||
      -1;
    const leftMember = meeting?.members.splice(leavedMemberIndex, 1)[0];
    if (!leftMember) {
      return;
    }
    await this._cacheManager.set(`meeting_${meeting?.id}`, meeting);
    return {
      emitMessage: `meeting:${meeting.id}_member_joined}`,
      data: leftMember,
    };
  }
}
