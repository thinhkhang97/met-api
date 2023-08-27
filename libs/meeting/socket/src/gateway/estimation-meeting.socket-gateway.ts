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

import { MeetingEventHandler } from '../event-handlers';
import { IdentityService } from '../services';

@WebSocketGateway(80)
export class EstimationMeetingSocketGateway extends SocketGateway {
  constructor(
    private readonly _identityService: IdentityService,
    @Inject(CACHE_MANAGER) protected readonly _cacheManager: Cache,
    private readonly _ioredisService: IoredisService,
    private readonly _meetingEventHandler: MeetingEventHandler,
  ) {
    super(_cacheManager);
    // _ioredisService.subscribe('MEETING');
    // _ioredisService.onMessage((channel, message) => {
    //   switch (channel) {
    //     case 'MEETING':
    //       this.handleMeetingEvent(message);
    //       break;
    //     default:
    //       return;
    //   }
    // });
  }

  // handleMeetingEvent(message: string) {
  //   const data = JSON.parse(message);
  //   switch (data.eventName) {
  //     case 'member_joined':
  //       this.handleMemberJoined(data.payload);
  //       break;
  //     default:
  //       return;
  //   }
  // }

  // async handleMemberJoined(member: {
  //   memberId: string;
  //   meetingId: string;
  //   name: string;
  //   role: number;
  // }) {
  //   const meeting = await this._cacheManager.get(`meeting_${member.meetingId}`);
  //   await this._cacheManager.set(`meeting_${member.meetingId}`, {
  //     members: [member],
  //   });
  //   this.server.emit('member_joined', member);
  // }

  @SubscribeMessage('meeting:join')
  public async onMemberJoined(
    @MessageBody() data: { memberId: string; meetingId: string },
    @ConnectedSocket() client: Socket,
  ) {
    const result = await this._meetingEventHandler.handleMemberJoinMeeting(
      data,
      client.id,
    );
    if (!result?.emitMessage) {
      return;
    }
    this.emit(result.emitMessage, result.data);
  }

  async authenticate(token: string) {
    return await this._identityService.authenticate(token);
  }

  async onClientDisconnect(client: Socket) {
    const result = await this._meetingEventHandler.handleMemberLeftMeeting(
      client.id,
    );
    if (!result?.emitMessage) {
      return;
    }
    this.server.emit(result?.emitMessage, result.data);
  }
}
