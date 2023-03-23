import { ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import { CreateEnvironmentDto } from './create-environment.dto';

export class UpdateEnvironmentDto extends PartialType(CreateEnvironmentDto) {
  @ApiPropertyOptional({ example: true })
  enabled?: boolean;
}
