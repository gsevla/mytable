import { Module } from '@nestjs/common';
import { WaitingQueueController } from './waiting-queue.controller';
import { WaitingQueueService } from './waiting-queue.service';

@Module({
  controllers: [WaitingQueueController],
  providers: [WaitingQueueService],
})
export class WaitingQueueModule {}
