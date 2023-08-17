import {
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway(80)
export class PlaningMeetingSocketGateway
  implements OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer()
  private readonly server!: Server;

  @SubscribeMessage('member_joined')
  public handleMemberJoined(@MessageBody() data: string) {
    this.server.emit('message', data);
  }

  handleConnection(client: Socket): any {
    const userName = client.handshake.headers['user-name'];
  }

  handleDisconnect(client: Socket): any {
    return;
  }
}
