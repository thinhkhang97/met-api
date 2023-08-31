import { SocketGateway } from '@lib/shared';
import { IoredisService } from '@lib/shared/modules/ioredis';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject } from '@nestjs/common';
import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
} from '@nestjs/websockets';
import { Cache } from 'cache-manager';
import { Socket } from 'socket.io';

import { EventName } from '../constance';
import { MeetingEventHandler } from '../event-handlers';
import { IdentityService } from '../services';
import { Member } from '../types';

@WebSocketGateway(80, {
  cors: {
    origin: '*',
  },
})
export class EstimationMeetingSocketGateway extends SocketGateway {
  constructor(
    @Inject(CACHE_MANAGER) protected readonly _cacheManager: Cache,
    private readonly _identityService: IdentityService,
    private readonly _ioredisService: IoredisService,
    private readonly _meetingEventHandler: MeetingEventHandler,
  ) {
    super(_cacheManager);
    this.initEventListener();
  }

  async initEventListener() {
    await this._ioredisService.subscribe('MEETING');
    this._ioredisService.onMessage((channel, message) => {
      switch (channel) {
        case 'MEETING':
          this.handleMeetingEvent(message);
          break;
        default:
          return;
      }
    });
  }

  async handleMeetingEvent(message: string) {
    const data = JSON.parse(message) as {
      eventName: EventName;
      payload: unknown;
    };
    switch (data.eventName) {
      case 'member_joined': {
        await this._meetingEventHandler.handleMemberJoined(
          data.payload as Member,
          this.server,
        );
        break;
      }
      case 'member_left': {
        this._meetingEventHandler.handleMemberLeftMeeting(
          data.payload as Member,
          this.server,
        );
        break;
      }
      default:
        return;
    }
  }

  @SubscribeMessage('meeting:request_join')
  public async onMemberJoined(
    @MessageBody() data: { memberId: string; meetingId: string; name: string },
    @ConnectedSocket() client: Socket,
  ) {
    await this._meetingEventHandler.handleMemberJoinMeeting(data.meetingId, {
      meetingId: data.meetingId,
      memberId: data.memberId,
      name: data.name,
      clientId: client.id,
    });
  }

  async authenticate(token: string) {
    return await this._identityService.authenticate(token);
  }

  async onClientDisconnect(client: Socket) {
    return this._meetingEventHandler.handleMemberLeaveMeeting(client);
  }
}
