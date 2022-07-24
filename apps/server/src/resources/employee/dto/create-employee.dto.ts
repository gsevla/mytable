import {
  ApiHideProperty,
  ApiProperty,
  ApiPropertyOptional,
} from '@nestjs/swagger';
import { Prisma } from '@prisma/client';

export class CreateEmployeeDto implements Prisma.EmployeeCreateInput {
  @ApiProperty({ example: 'Gabriel' })
  name: string;

  @ApiProperty({ example: 'Alves' })
  surname: string;

  @ApiProperty({ example: 'gabriel.alves' })
  username: string;

  @ApiProperty({ example: 'minhasenha' })
  password: string;

  @ApiPropertyOptional({
    example: 'ORDINARY',
  })
  role?: 'ADMIN' | 'ORDINARY';

  @ApiHideProperty()
  enabled?: boolean;

  @ApiHideProperty()
  restaurant: Prisma.RestaurantCreateNestedOneWithoutEmployeeInput;
}
