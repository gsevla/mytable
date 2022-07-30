import { Module } from '@nestjs/common';
import { ReservationOrderHistoryService } from './reservation-order-history.service';
import { ReservationOrderHistoryController } from './reservation-order-history.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [ReservationOrderHistoryController],
  providers: [ReservationOrderHistoryService, PrismaService],
})
export class ReservationOrderHistoryModule {}
