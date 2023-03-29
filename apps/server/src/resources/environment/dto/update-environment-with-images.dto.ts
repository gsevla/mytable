import {
  UpdateEnvironmentImageInput,
  UpdateEnvironmentWithImagesInput,
} from '@mytable/domain';
import { ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import { CreateEnvironmentWithImagesDto } from './create-environment-with-images.dto';

export class UpdateEnvironmentWithImagesDto
  extends PartialType(CreateEnvironmentWithImagesDto)
  implements Partial<Omit<UpdateEnvironmentWithImagesInput, 'id'>>
{
  @ApiPropertyOptional({ example: true })
  enabled?: boolean;

  @ApiPropertyOptional({
    example: [
      {
        addr: 'image.link.com',
        description: 'a brief description of the image',
      },
    ],
  })
  images?: Array<UpdateEnvironmentImageInput>;
}
