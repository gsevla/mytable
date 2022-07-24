import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import { Employee } from '@prisma/client';

export class EmployeeEntity implements Employee {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;

  @ApiProperty()
  surname: string;

  @ApiProperty()
  username: string;

  @ApiHideProperty()
  password: string;

  @ApiProperty()
  role: 'ADMIN' | 'ORDINARY';

  @ApiProperty()
  restaurantId: number;

  @ApiProperty()
  enabled: boolean;
}
