import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { RestaurantController } from './restaurant.controller';
import { RestaurantService } from './restaurant.service';

@Module({
  providers: [RestaurantService, PrismaService],
  controllers: [RestaurantController],
  exports: [RestaurantService],
})
export class RestaurantModule {}
