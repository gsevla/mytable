import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { ReservationOrderService } from './reservation-order.service';
import { ReservationOrderController } from './reservation-order.controller';
import { JwtStrategy } from '../auth/jwt.strategy';
import { AuthValidator } from '../auth/validator';

@Module({
  controllers: [ReservationOrderController],
  providers: [
    ReservationOrderService,
    PrismaService,
    JwtStrategy,
    AuthValidator,
  ],
})
export class ReservationOrderModule {}
