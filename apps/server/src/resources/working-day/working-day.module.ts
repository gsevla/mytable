import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { WorkingDayService } from './working-day.service';
import { WorkingDayController } from './working-day.controller';

@Module({
  controllers: [WorkingDayController],
  providers: [WorkingDayService, PrismaService],
})
export class WorkingDayModule {}
