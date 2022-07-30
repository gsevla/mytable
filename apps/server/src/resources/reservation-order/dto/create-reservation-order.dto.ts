import { ApiProperty } from '@nestjs/swagger';
import { Prisma } from '@prisma/client';

export class CreateReservationOrderDto
  implements
    Omit<
      Prisma.ReservationOrderCreateWithoutRestaurantInput,
      | 'ReservationOrderHistory'
      | 'client'
      | 'createdAt'
      | 'modifiedAt'
      | 'status'
      | 'environment'
    >
{
  @ApiProperty({ example: 1 })
  clientId: number;

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
}
