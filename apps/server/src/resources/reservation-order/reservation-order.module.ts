import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { ReservationOrderService } from './reservation-order.service';
import { ReservationOrderController } from './reservation-order.controller';

@Module({
  controllers: [ReservationOrderController],
  providers: [ReservationOrderService, PrismaService],
})
export class ReservationOrderModule {}
