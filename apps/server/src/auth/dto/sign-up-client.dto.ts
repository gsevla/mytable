import { CreateClientInput } from '@mytable/domain';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class SignUpClientDto implements CreateClientInput {
  @ApiPropertyOptional({ description: 'Client CPF' })
  cpf: string;

  @ApiPropertyOptional({ description: 'Client name', example: 'Gabriel' })
  name: string;

  @ApiPropertyOptional({ description: 'Client surname', example: 'Alves' })
  surname: string;

  @ApiPropertyOptional({
    description: "Client's phone number",
    example: '88 99999-8888',
  })
  phone: string;

  @ApiPropertyOptional({
    description: "Client's email address",
    example: 'gabriel.alves@mytable.com',
  })
  email: string;
}
