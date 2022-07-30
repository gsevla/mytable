import { ApiProperty } from '@nestjs/swagger';
import { DayEnum, Prisma } from '@prisma/client';

export class CreateWorkingDayDto
  implements Prisma.WorkingDaysCreateWithoutRestaurantInput
{
  @ApiProperty({ example: DayEnum.MONDAY })
  day: DayEnum;

  @ApiProperty({ example: '14:00' })
  openingTime: string;

  @ApiProperty({ example: '23:00' })
  closingTime: string;
}
