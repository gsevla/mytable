import { ApiProperty } from '@nestjs/swagger';
import { Restaurant } from '@prisma/client';

export class RestaurantEntity implements Restaurant {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;

  @ApiProperty()
  ownerName: string;

  @ApiProperty()
  address: string;

  @ApiProperty()
  coverImage: string | null;

  @ApiProperty()
  primaryColor: string;

  @ApiProperty()
  accentColor: string;
}
