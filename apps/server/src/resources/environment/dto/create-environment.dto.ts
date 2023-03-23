import { ApiProperty } from '@nestjs/swagger';
import { CreateEnvironmentInput } from '@mytable/domain';

export class CreateEnvironmentDto implements CreateEnvironmentInput {
  @ApiProperty({ example: 'Ambiente interno' })
  name: string;

  @ApiProperty({ example: 'Descrição da área interna do restaurante' })
  description?: string;

  @ApiProperty({
    example: 30,
    description: 'Quantidade de pessoas que cabem no ambiente',
  })
  capacity: number;
}
