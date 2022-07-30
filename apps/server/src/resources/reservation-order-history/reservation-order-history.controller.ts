import { Controller, Get, Param } from '@nestjs/common';
import { ApiNotFoundResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { ReservationOrderHistoryEntity } from './entities/reservation-order-history.entity';
import { ReservationOrderHistoryService } from './reservation-order-history.service';

@Controller('reservation-order-history')
@ApiTags('reservation-order-history')
export class ReservationOrderHistoryController {
  constructor(
    private readonly reservationOrderHistoryService: ReservationOrderHistoryService
  ) {}

  @Get()
  @ApiOkResponse({
    description: 'Returns all reservation order history records',
    type: [ReservationOrderHistoryEntity],
  })
  findAll() {
    return this.reservationOrderHistoryService.findAll();
  }

  @Get(':id')
  @ApiOkResponse({
    description: 'Returns a reservation order history record',
    type: ReservationOrderHistoryEntity,
  })
  @ApiNotFoundResponse()
  findOne(@Param('id') id: string) {
    return this.reservationOrderHistoryService.findOne(+id);
  }
}
