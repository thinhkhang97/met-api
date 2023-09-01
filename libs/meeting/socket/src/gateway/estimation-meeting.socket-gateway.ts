import { MeetingChannel, MeetingEventName } from '@lib/meeting/application';
import { Logger, SocketGateway } from '@lib/shared';
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

import { MeetingMessageName } from '../constance';
import { MeetingEventHandler } from '../event-handlers';
import { IdentityService } from '../services';
import { Member } from '../types';

@WebSocketGateway(80, {
  cors: {
    origin: '*',
  },
})
export class EstimationMeetingSocketGateway extends SocketGateway {
  private readonly _logger = new Logger();

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
    await this._ioredisService.subscribe(MeetingChannel.ESTIMATION_MEETING);
    this._ioredisService.onMessage((channel, message) => {
      this._logger.verbose(
        `Handle message from channel ${channel}: ${message}`,
      );
      switch (channel) {
        case MeetingChannel.ESTIMATION_MEETING:
          this.handleMeetingEvent(message);
          break;
        default:
          return;
      }
    });
  }

  async handleMeetingEvent(message: string) {
    const data = JSON.parse(message) as {
      eventName: MeetingEventName;
      payload: unknown;
    };
    switch (data.eventName) {
      case MeetingEventName.MEMBER_JOINED: {
        await this._meetingEventHandler.handleMemberJoined(
          data.payload as Member,
          this.server,
        );
        break;
      }
      case MeetingEventName.MEMBER_LEFT: {
        break;
      }
      default:
        return;
    }
  }

  @SubscribeMessage(MeetingMessageName.REQUEST_JOINED)
  public async onMemberRequestJoin(
    @MessageBody() data: { memberId: string; meetingId: string; name: string },
    @ConnectedSocket() client: Socket,
  ) {
    await this._meetingEventHandler.handleMemberJoinMeeting(data.meetingId, {
      meetingId: data.meetingId,
      memberId: data.memberId,
      name: data.name,
      clientId: client.id,
    });
    this.server.to(client.id).emit(MeetingMessageName.RECEIVED_REQUEST);
  }

  async authenticate(token: string) {
    return await this._identityService.authenticate(token);
  }

  async onClientDisconnect(client: Socket) {
    return this._meetingEventHandler.handleMemberLeaveMeeting(
      client,
      this.server,
    );
  }
}
