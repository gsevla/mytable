import { ApiPropertyOptional } from '@nestjs/swagger';
import { Prisma } from '@prisma/client';

export class UpdateRestaurantDto implements Prisma.RestaurantUpdateInput {
  @ApiPropertyOptional({ example: 'Restaurantinho' })
  name?: string;

  @ApiPropertyOptional({ example: 'Fulano de tal' })
  ownerName?: string;

  @ApiPropertyOptional({
    example: 'Rua sem nome, nº 437, Bairro - Cidade/ESTADO',
  })
  address?: string;

  @ApiPropertyOptional({ example: 'http://www.link.to/image' })
  coverImage?: string | null;

  @ApiPropertyOptional({ example: '#ffffff' })
  primaryColor?: string;

  @ApiPropertyOptional({ example: '#000000' })
  accentColor?: string;
}
