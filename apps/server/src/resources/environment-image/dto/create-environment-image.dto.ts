import { ApiProperty } from '@nestjs/swagger';
import { CreateEnvironmentImageInput } from '@mytable/domain';

export class CreateEnvironmentImageDto implements CreateEnvironmentImageInput {
  @ApiProperty({ example: 1 })
  environmentId: number;

  @ApiProperty({ example: 'https://www.link.to/image' })
  addr: string;

  @ApiProperty({ example: 'Descrição da imagem' })
  description?: string;
}
