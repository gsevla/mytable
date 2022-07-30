import {
  ApiHideProperty,
  ApiProperty,
  ApiPropertyOptional,
  PartialType,
} from '@nestjs/swagger';
import { ReservationOrderStatusEnum } from '@prisma/client';
import { CreateReservationOrderDto } from './create-reservation-order.dto';

export class UpdateReservationOrderDto extends PartialType(
  CreateReservationOrderDto
) {
  @ApiProperty({ example: ReservationOrderStatusEnum.ACCEPTED })
  status?: ReservationOrderStatusEnum;

  @ApiHideProperty()
  clientId?: number;

  @ApiPropertyOptional({
    example: 'Cliente não compareceu ao restaurante no prazo',
    description: 'Motivo da alteração do pedido de reserva',
  })
  reason?: string;
}
