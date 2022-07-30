import { ApiProperty } from '@nestjs/swagger';
import { EnvironmentImage } from '@prisma/client';

export class EnvironmentImageEntity implements EnvironmentImage {
  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty({ example: 1 })
  environmentId: number;

  @ApiProperty({ example: 'https://www.link.to/image' })
  addr: string;

  @ApiProperty({ example: 'Descrição da imagem' })
  description: string | null;
}
