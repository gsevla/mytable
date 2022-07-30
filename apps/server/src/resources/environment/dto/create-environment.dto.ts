import { ApiProperty } from '@nestjs/swagger';
import { Prisma } from '@prisma/client';

export class CreateEnvironmentDto
  implements Prisma.EnvironmentCreateWithoutRestaurantInput
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
}
