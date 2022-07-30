import { ApiProperty } from '@nestjs/swagger';
import { ReservationOrder, ReservationOrderStatusEnum } from '@prisma/client';

export class ReservationOrderEntity implements ReservationOrder {
  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty({ example: 1 })
  clientId: number;

  @ApiProperty({ example: 1 })
  restaurantId: number;

  @ApiProperty({ example: 1 })
  environmentId: number;

  @ApiProperty({ example: 2 })
  peopleAmount: number;

  @ApiProperty({ example: '29/11/2022' })
  date: string;

  @ApiProperty({ example: '14:00' })
  startTime: string;

  @ApiProperty({ example: '15:00' })
  endTime: string;

  @ApiProperty({ example: 1659202199892 })
  createdAt: Date;

  @ApiProperty({ example: 1659202199892 })
  modifiedAt: Date;

  @ApiProperty({ example: ReservationOrderStatusEnum.PENDING })
  status: ReservationOrderStatusEnum;
}
