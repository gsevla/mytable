import { ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import { UpdateWorkingDayInput } from '@mytable/domain';
import { CreateWorkingDayDto } from './create-working-day.dto';

export class UpdateWorkingDayDto
  extends PartialType(CreateWorkingDayDto)
  implements Partial<UpdateWorkingDayInput>
{
  @ApiPropertyOptional({ example: false })
  open?: boolean;
}
