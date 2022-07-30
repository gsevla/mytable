import { ApiProperty } from '@nestjs/swagger';
import {
  ReservationOrderHistory,
  ReservationOrderStatusEnum,
} from '@prisma/client';

export class ReservationOrderHistoryEntity implements ReservationOrderHistory {
  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty({ example: 1 })
  reservationOrderId: number;

  @ApiProperty({ example: ReservationOrderStatusEnum.CANCELED })
  status: ReservationOrderStatusEnum;

  @ApiProperty({ example: 1 })
  employeeId: number;

  @ApiProperty({ example: 1659209220432 })
  createdAt: Date;

  @ApiProperty({ example: 2 })
  peopleAmount: number;

  @ApiProperty({ example: '29/11/2022' })
  date: string;

  @ApiProperty({ example: '14:00' })
  startTime: string;

  @ApiProperty({ example: '15:00' })
  endTime: string;

  @ApiProperty({ example: 'Modificado por razão tal' })
  reason: string | null;
}
