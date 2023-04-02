import { ApiPropertyOptional } from '@nestjs/swagger';

export class SignInDto {
  @ApiPropertyOptional({ description: 'Used to sign in a client' })
  cpf?: string;

  @ApiPropertyOptional({ description: 'Used to sign in a employee' })
  username?: string;

  @ApiPropertyOptional({ description: 'Used to sign in a employee' })
  password?: string;
}
