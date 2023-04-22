import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Restaurant, Prisma } from '@prisma/client';

@Injectable()
export class RestaurantService {
  constructor(private prismaService: PrismaService) {}

  getRestaurant() {
    return this.prismaService.restaurant.findUnique({ where: { id: 1 } });
  }

  getRestaurantWithInfo() {
    return this.prismaService.restaurant.findUnique({
      where: {
        id: 1,
      },
      include: {
        environments: {
          include: {
            images: true,
          },
        },
        workingDays: true,
      },
    });
  }

  updateRestaurant(
    id: number,
    data: Prisma.RestaurantUpdateInput
  ): Promise<Restaurant> {
    return this.prismaService.restaurant.update({ where: { id }, data });
  }
}
