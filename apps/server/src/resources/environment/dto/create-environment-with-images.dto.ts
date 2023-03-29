import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

import {
  CreateEnvironmentImageInput,
  CreateEnvironmentWithImagesInput,
} from '@mytable/domain';

export class CreateEnvironmentWithImagesDto
  implements CreateEnvironmentWithImagesInput
{
  @ApiProperty({ example: 'Ambiente interno' })
  name: string;

  @ApiProperty({ example: 'Descrição da área interna do restaurante' })
  description?: string;

  @ApiProperty({
    example: 30,
    description: 'Quantidade de pessoas que cabem no ambiente',
  })
  capacity: number;

  @ApiPropertyOptional({
    example: [
      {
        addr: 'image.link.com',
        description: 'a brief description of the image',
      },
    ],
  })
  images?: Array<Omit<CreateEnvironmentImageInput, 'environmentId'>>;
}
