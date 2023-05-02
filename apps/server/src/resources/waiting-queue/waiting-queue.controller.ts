import { Body, Controller, Get, Post } from '@nestjs/common';
import { JoinWaitingQueueInput, LeaveWaitingQueueInput } from '@mytable/domain';
import { ApiTags } from '@nestjs/swagger';
import { WaitingQueueService } from './waiting-queue.service';

@Controller('waiting-queue')
@ApiTags('waiting-queue')
export class WaitingQueueController {
  constructor(private waitingQueueService: WaitingQueueService) {}

  @Post('/join')
  joinQueue(@Body() info: JoinWaitingQueueInput) {
    return this.waitingQueueService.joinWaitingQueue(info);
  }

  @Post('/leave')
  leaveQueue(@Body() info: LeaveWaitingQueueInput) {
    return this.waitingQueueService.leaveWaitingQueue(info);
  }

  @Post('/attend')
  attendQueue() {
    return this.waitingQueueService.attendWaitingQueue();
  }

  @Get()
  getWaitingQueue() {
    return this.waitingQueueService.getWaitingQueue();
  }
}
