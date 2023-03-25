import { ApiProperty } from '@nestjs/swagger';
import { Day, CreateWorkingDayInput } from '@mytable/domain';

export class CreateWorkingDayDto implements CreateWorkingDayInput {
  @ApiProperty({ example: Day.MONDAY })
  day: Day;

  @ApiProperty({ example: '10:00' })
  openingTime: string;

  @ApiProperty({ example: '23:00' })
  closingTime: string;
}
