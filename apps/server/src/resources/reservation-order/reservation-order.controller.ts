import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthenticatedUser } from 'src/interceptors/authenticatedUser';
import { ReservationOrderService } from './reservation-order.service';
import { CreateReservationOrderDto } from './dto/create-reservation-order.dto';
import { UpdateReservationOrderDto } from './dto/update-reservation-order.dto';
import { ReservationOrderGuard } from './reservation-order.guard';

@Controller('reservation-order')
@ApiTags('reservation-order')
@ApiBearerAuth()
@UseGuards(ReservationOrderGuard)
export class ReservationOrderController {
  constructor(
    private readonly reservationOrderService: ReservationOrderService
  ) {}

  @Post()
  create(@Body() createReservationOrderDto: CreateReservationOrderDto) {
    return this.reservationOrderService.create(createReservationOrderDto);
  }

  @Get()
  findAll(@AuthenticatedUser() user: any) {
    // console.log('user', user);
    if (user?.cpf) {
      return this.reservationOrderService.findAllFromClient(user.id);
    }
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
