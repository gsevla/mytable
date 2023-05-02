import { Logger } from '@nestjs/common';
import {
  WebSocketGateway,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  MessageBody,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import {
  JoinWaitingQueueInput,
  LeaveWaitingQueueInput,
  WaitingQueueClient,
} from '@mytable/domain';
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
    client.join('waitingQueue');
  }

  handleDisconnect(client: Socket) {
    // @ts-ignore
    this.logger.log(`client ${client.username} (${client.id}) disconnected!`);
  }

  // @SubscribeMessage('joinWaitingQueue')
  // onJoinWaitingQueue(
  //   @MessageBody()
  //   body: JoinWaitingQueueInput
  // ) {
  //   console.log('onJoinWaitingQueue', body);
  //   this.server.to('waitingQueue').emit('onJoinWaitingQueue', {
  //     name: body.name,
  //   } as WaitingQueueClient);

  //   return body;
  // }

  // @SubscribeMessage('leaveWaitingQueue')
  // onLeaveWaitingQueue(@MessageBody() body: LeaveWaitingQueueInput) {
  //   console.log('onLeaveWaitingQueue', body);
  //   this.server.to('waitingQueue').emit('onLeaveWaitingQueue', {
  //     clientIdentifier: body.clientIdentifier,
  //   } as LeaveWaitingQueueInput);

  //   return body;
  // }
}
