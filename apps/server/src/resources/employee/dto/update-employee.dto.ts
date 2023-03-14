import { ApiPropertyOptional, OmitType, PartialType } from '@nestjs/swagger';
import { CreateEmployeeDto } from './create-employee.dto';

export class UpdateEmployeeDto extends PartialType(
  OmitType(CreateEmployeeDto, ['username'])
) {
  @ApiPropertyOptional({ example: false })
  enabled?: boolean;
}
