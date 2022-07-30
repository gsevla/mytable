import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import { Prisma } from '@prisma/client';

export class CreateEnvironmentImageDto
  implements Prisma.EnvironmentImageCreateInput
{
  @ApiHideProperty()
  environment: Prisma.EnvironmentCreateNestedOneWithoutEnvironmentImageInput;

  @ApiProperty({ example: 1 })
  environmentId: number;

  @ApiProperty({ example: 'https://www.link.to/image' })
  addr: string;

  @ApiProperty({ example: 'Descrição da imagem' })
  description?: string;
}
