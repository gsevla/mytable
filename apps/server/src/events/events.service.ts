import { Injectable } from '@nestjs/common';
import { ReservationOrderStatusEnum } from '@prisma/client';
import { createClient } from 'redis';
import { Server } from 'socket.io';

@Injectable()
export class EventsService {
  public server: Server | null = null;

  protected pubClient = createClient({ url: `redis://localhost:6379` });

  protected subClient = this.pubClient.duplicate();

  public async connectToRedis(): Promise<void> {
    await Promise.all([this.pubClient.connect(), this.subClient.connect()]);
  }

  public emit(event: string, data: unknown) {
    this.server.emit(event, data);
  }

  public emitTo(event: string, to: string, data: unknown) {
    this.server.to(to).emit(event, data);
  }

  public emitReservationOrderStatusChange(
    to: string | null,
    data: {
      id: number;
      status: ReservationOrderStatusEnum;
    }
  ) {
    const eventName = 'onReservationOrderStatusChanged';
    if (to === null) {
      this.emit(eventName, data);
    } else {
      this.emitTo(eventName, to, data);
    }
  }
}
