import { ApiProperty } from '@nestjs/swagger';
import { DayEnum, WorkingDays } from '@prisma/client';

export class WorkingDay implements WorkingDays {
  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty({ example: DayEnum.MONDAY })
  day: DayEnum;

  @ApiProperty({ example: '14:00' })
  openingTime: string;

  @ApiProperty({ example: '23:00' })
  closingTime: string;

  @ApiProperty({ example: 1 })
  restaurantId: number;
}
