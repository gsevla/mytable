import { ApiHideProperty, PartialType } from '@nestjs/swagger';
import { CreateEnvironmentImageDto } from './create-environment-image.dto';

export class UpdateEnvironmentImageDto extends PartialType(
  CreateEnvironmentImageDto
) {
  @ApiHideProperty()
  environmentId?: number;
}
