import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Restaurant, Prisma } from '@prisma/client';

@Injectable()
export class RestaurantService {
  constructor(private prismaService: PrismaService) {}

  createRestaurant(data: Prisma.RestaurantCreateInput): Promise<Restaurant> {
    return this.prismaService.restaurant.create({ data });
  }

  getRestaurant() {
    return this.prismaService.restaurant.findUnique({ where: { id: 1 } });
  }
}
