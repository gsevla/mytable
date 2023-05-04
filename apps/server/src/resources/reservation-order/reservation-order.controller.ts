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
import { Employee } from '@mytable/domain';
import { ReservationOrderService } from './reservation-order.service';
import { CreateReservationOrderDto } from './dto/create-reservation-order.dto';
import { UpdateReservationOrderDto } from './dto/update-reservation-order.dto';
import { ReservationOrderGuard } from './reservation-order.guard';
import { CreateReservationOrderWithClientIdentifierDto } from './dto/create-reservation-order-with-client-identifier.dto copy';

@Controller('reservation-order')
@ApiTags('reservation-order')
@ApiBearerAuth()
@UseGuards(ReservationOrderGuard)
export class ReservationOrderController {
  constructor(
    private readonly reservationOrderService: ReservationOrderService
  ) {}

  @Post()
  create(
    @Body() createReservationOrderDto: CreateReservationOrderDto,
    @AuthenticatedUser() user: Employee
  ) {
    return this.reservationOrderService.create(createReservationOrderDto, user);
  }

  @Post('/with-client-identifier')
  createWithClientIdentifier(
    @Body()
    createReservationOrderDto: CreateReservationOrderWithClientIdentifierDto,
    @AuthenticatedUser() user: Employee
  ) {
    return this.reservationOrderService.createWithClientIdentifier(
      createReservationOrderDto,
      user
    );
  }

  @Get()
  findAll(@AuthenticatedUser() user: any) {
    if (user?.cpf) {
      return this.reservationOrderService.findAllFromClient(user.id);
    }
    return this.reservationOrderService.findAll();
  }

  @Get('/active')
  findAllActive(@AuthenticatedUser() user: any) {
    if (user?.cpf) {
      return this.reservationOrderService.findAllActiveFromClient(user.id);
    }
    return this.reservationOrderService.findAllActive();
  }

  @Get('/history')
  findAllHistory(@AuthenticatedUser() user: any) {
    if (user?.cpf) {
      return this.reservationOrderService.findAllHistoryFromClient(user.id);
    }
    return this.reservationOrderService.findAllHistory();
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

  @Patch('/cancel/:id')
  cancel(@Param('id') id: string, @AuthenticatedUser() user: any) {
    if (!user?.cpf) return this;

    return this.reservationOrderService.cancel(parseInt(id, 10), user.id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.reservationOrderService.remove(+id);
  }
}
