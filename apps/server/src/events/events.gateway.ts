import { Logger } from '@nestjs/common';
import {
  WebSocketGateway,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { EventsService } from './events.service';

@WebSocketGateway()
export class EventsGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  private logger = new Logger('EventsGateway');

  constructor(private eventsService: EventsService) {}

  @WebSocketServer()
  server: Server;

  users: Record<string, string> = {}; // { socket.username: socket.id }

  afterInit(server: Server) {
    this.eventsService.server = server;
    server.use((socket, next) => {
      const { username } = socket.handshake.auth;
      if (!username) {
        return next(new Error('invalid username'));
      }
      // @ts-ignore
      // add username to socket in order to reuse it
      socket.username = username;
      next();
    });
  }

  handleConnection(client: Socket, ...args: any[]) {
    // @ts-ignore
    this.logger.log(`client ${client.username} (${client.id}) connected!`);
    // @ts-ignore
    client.join(client.username);
  }

  handleDisconnect(client: Socket) {
    // @ts-ignore
    this.logger.log(`client ${client.username} (${client.id}) disconnected!`);
  }
}
