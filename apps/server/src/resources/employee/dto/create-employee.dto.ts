import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Prisma } from '@prisma/client';

export class CreateEmployeeDto implements Partial<Prisma.EmployeeCreateInput> {
  @ApiProperty({ example: 'Gabriel' })
  name: string;

  @ApiProperty({ example: 'Alves' })
  surname: string;

  @ApiProperty({ example: 'gabriel.alves' })
  username: string;

  @ApiProperty({ example: 'minhasenha' })
  password: string;

  // @ApiProperty({
  //   examples: [EmployeeRoleEnum.ADMIN, EmployeeRoleEnum.ORDINARY],
  // })
  @ApiPropertyOptional()
  role?: 'ADMIN' | 'ORDINARY';
}
