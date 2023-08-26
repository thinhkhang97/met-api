import { IoredisService } from '@lib/shared/modules/ioredis';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject, OnModuleInit } from '@nestjs/common';
import {
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Cache } from 'cache-manager';
import { Server, Socket } from 'socket.io';

interface UserData {
  name: string;
  socketId: string;
  status: string;
}

@WebSocketGateway(80)
export class PlaningMeetingSocketGateway
  implements OnGatewayConnection, OnGatewayDisconnect, OnModuleInit
{
  @WebSocketServer()
  private readonly server!: Server;

  constructor(
    @Inject(CACHE_MANAGER) private readonly cacheManager: Cache,
    _ioredisService: IoredisService,
  ) {
    _ioredisService.subscribe('MEETING');
    _ioredisService.onMessage((channel, message) => {
      this.server.emit('member_joined', message);
    });
  }

  @SubscribeMessage('member_joined')
  public handleMemberJoined(@MessageBody() data: string) {
    this.server.emit('message', data);
  }

  async announceMemberChangeStatus(user: UserData) {
    const friends = await this.cacheManager.get<UserData[]>('friends');
    friends?.forEach((friend) => {
      if (friend.socketId !== user.socketId) {
        this.server.to(friend.socketId).emit('member_change_status', user);
      }
    });
  }

  async handleConnection(client: Socket) {
    // const [_, token] = client.handshake.headers.authorization?.split(' ') || [];
    const userName = client.handshake.headers['user-name'];
    const user: UserData = {
      name: userName as string,
      socketId: client.id,
      status: 'active',
    };
    await this.cacheManager.set(`${client.id}`, user, 3600 * 1000);
    const friends: UserData[] = (await this.cacheManager.get('friends')) || [];
    await this.cacheManager.set('friends', friends.concat(user));
    await this.announceMemberChangeStatus(user);
  }

  async handleDisconnect(client: Socket) {
    const user = await this.cacheManager.get<UserData>(client.id);
    if (user) {
      user.status = 'inactive';
      await this.cacheManager.set(client.id, user);
      await this.announceMemberChangeStatus(user);
    }
  }

  onModuleInit() {
    this.cacheManager.reset();
  }
}
