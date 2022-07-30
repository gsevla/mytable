import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ReservationOrderService } from './reservation-order.service';
import { CreateReservationOrderDto } from './dto/create-reservation-order.dto';
import { UpdateReservationOrderDto } from './dto/update-reservation-order.dto';

@Controller('reservation-order')
@ApiTags('reservation-order')
export class ReservationOrderController {
  constructor(
    private readonly reservationOrderService: ReservationOrderService
  ) {}

  @Post()
  create(@Body() createReservationOrderDto: CreateReservationOrderDto) {
    return this.reservationOrderService.create(createReservationOrderDto);
  }

  @Get()
  findAll() {
    return this.reservationOrderService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.reservationOrderService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateReservationOrderDto: UpdateReservationOrderDto
  ) {
    return this.reservationOrderService.update(+id, updateReservationOrderDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.reservationOrderService.remove(+id);
  }
}
