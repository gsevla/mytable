import {
  CreateEnvironmentImageInput,
  UpdateEnvironmentImageInput,
  UpdateEnvironmentWithImagesInput,
} from '@mytable/domain';
import { ApiPropertyOptional, PartialType, OmitType } from '@nestjs/swagger';
import { CreateEnvironmentWithImagesDto } from './create-environment-with-images.dto';

export class UpdateEnvironmentWithImagesDto
  extends PartialType(OmitType(CreateEnvironmentWithImagesDto, ['images']))
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
  images?: Array<
    | UpdateEnvironmentImageInput &
        Omit<CreateEnvironmentImageInput, 'environmentId'>
  >;
}
