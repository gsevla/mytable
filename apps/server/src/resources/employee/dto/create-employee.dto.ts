import { CreateEmployeeInput, EmployeeRole } from '@mytable/domain';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateEmployeeDto implements CreateEmployeeInput {
  @ApiProperty({ example: 'Gabriel' })
  name: string;

  @ApiProperty({ example: 'Alves' })
  surname: string;

  @ApiProperty({ example: 'gabriel.alves' })
  username: string;

  @ApiProperty({ example: 'minhasenha' })
  password: string;

  @ApiPropertyOptional({
    example: EmployeeRole.ORDINARY,
  })
  role?: EmployeeRole;
}
