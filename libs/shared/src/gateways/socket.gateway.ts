import { CacheKey } from '@lib/shared/services';
import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  WebSocketServer,
} from '@nestjs/websockets';
import { instrument } from '@socket.io/admin-ui';
import { Cache } from 'cache-manager';
import { Server, Socket } from 'socket.io';

export abstract class SocketGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer()
  protected readonly server!: Server;

  protected constructor(protected readonly _cacheManager: Cache) {}

  async handleConnection(client: Socket) {
    const headers = client.handshake.headers;
    const token = headers.authorization?.split(' ')[1];
    if (!token) {
      client.disconnect();
      return;
    }
    const user = (await this.authenticate(token)) as { id: string };
    if (!user) {
      client.disconnect();
    } else {
      await this._cacheManager.set(`${CacheKey.CLIENT}:${client.id}`, user);
      await this._cacheManager.set(`${CacheKey.USER}:${user.id}`, user);
    }
  }

  public abstract authenticate(token: string): Promise<unknown>;

  public abstract onClientDisconnect(client: Socket);

  async handleDisconnect(client: Socket) {
    this.onClientDisconnect(client);
    const user = (await this._cacheManager.get(
      `${CacheKey.CLIENT}:${client.id}`,
    )) as { id: string };
    if (!user) {
      return;
    }
    this._cacheManager.del(`${CacheKey.USER}:${user.id}`);
    this._cacheManager.del(`${CacheKey.CLIENT}:${client.id}`);
  }

  async afterInit() {
    this.server.use((socket, next) => {
      next();
    });
    await this._cacheManager.reset();
    instrument(this.server, {
      auth: false,
      readonly: true,
      mode: 'development',
    });
  }

  protected emit(message: string, data?: unknown) {
    this.server.emit(message, data || {});
  }
}
