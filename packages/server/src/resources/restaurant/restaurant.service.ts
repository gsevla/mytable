import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Restaurant, Prisma } from '@prisma/client';

@Injectable()
export class RestaurantService {
  constructor(private prisma: PrismaService) {}

  async createRestaurant(
    data: Prisma.RestaurantCreateInput,
  ): Promise<Restaurant> {
    return this.prisma.restaurant.create({ data });
  }
}
