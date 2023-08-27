import { OnModuleInit } from '@nestjs/common';
import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  WebSocketServer,
} from '@nestjs/websockets';
import { Cache } from 'cache-manager';
import { Server, Socket } from 'socket.io';

export abstract class SocketGateway
  implements OnGatewayConnection, OnGatewayDisconnect, OnModuleInit
{
  @WebSocketServer()
  protected readonly server!: Server;

  protected constructor(protected readonly _cacheManager: Cache) {}

  async handleConnection(client: Socket) {
    const headers = client.handshake.headers;
    const [_, token] = headers.authorization?.split(' ') || [];
    const user = await this.authenticate(token);
    if (!user) {
      client.disconnect();
    } else {
      await this._cacheManager.set(`${client.id}`, user);
    }
  }

  public abstract authenticate(token: string): Promise<unknown>;

  public abstract onClientDisconnect(client: Socket);

  handleDisconnect(client: Socket) {
    this.onClientDisconnect(client);
  }

  async onModuleInit() {
    await this._cacheManager.reset();
  }

  protected emit(message: string, data?: unknown) {
    this.server.emit(message, data || {});
  }
}
