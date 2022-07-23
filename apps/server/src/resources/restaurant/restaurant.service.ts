import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Restaurant, Prisma } from '@prisma/client';

@Injectable()
export class RestaurantService {
  constructor(private prismaService: PrismaService) {}

  getRestaurant() {
    return this.prismaService.restaurant.findUnique({ where: { id: 1 } });
  }

  updateRestaurant(
    id: number,
    data: Prisma.RestaurantUpdateInput
  ): Promise<Restaurant> {
    return this.prismaService.restaurant.update({ where: { id }, data });
  }
}
