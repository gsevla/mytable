import { Injectable } from '@nestjs/common';
import { ReservationOrderStatusEnum } from '@prisma/client';
import { Server } from 'socket.io';

@Injectable()
export class EventsService {
  public server: Server | null = null;

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
