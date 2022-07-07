import { ApiProperty } from '@nestjs/swagger';
import { Client } from '@prisma/client';

export class ClientEntity implements Client {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;

  @ApiProperty()
  surname: string;

  @ApiProperty()
  phone: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  cpf: string;

  @ApiProperty()
  identifier: string;
}
