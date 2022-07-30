import { ApiProperty } from '@nestjs/swagger';
import { Environment } from '@prisma/client';

export class EnvironmentEntity implements Environment {
  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty({ example: 'Área interna' })
  name: string;

  @ApiProperty({ example: 'Descrição da área interna do restaurante' })
  description: string | null;

  @ApiProperty({
    example: 30,
    description: 'Quantidade de pessoas que cabem no ambiente',
  })
  capacity: number;

  @ApiProperty({ example: 1 })
  restaurantId: number;
}
