import { ApiProperty } from '@nestjs/swagger';
import { Day, WorkingDay as DomainWorkingDay } from '@mytable/domain';

export class WorkingDay implements DomainWorkingDay {
  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty({ example: Day.MONDAY })
  day: Day;

  @ApiProperty({ example: '10:00' })
  openingTime: string;

  @ApiProperty({ example: '23:00' })
  closingTime: string;

  @ApiProperty({ example: 1 })
  restaurantId: number;

  @ApiProperty({ example: false })
  open: boolean;
}
