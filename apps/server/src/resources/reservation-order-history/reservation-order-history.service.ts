import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ReservationOrderHistoryService {
  constructor(private prismaService: PrismaService) {}

  findAll() {
    return this.prismaService.reservationOrderHistory.findMany();
  }

  async findOne(id: number) {
    const dbReservationOrderHistory =
      await this.prismaService.reservationOrderHistory.findUnique({
        where: {
          id,
        },
      });

    if (!dbReservationOrderHistory) {
      throw new NotFoundException(
        'Verifique os dados e tente novamente mais tarde.'
      );
    }

    return dbReservationOrderHistory;
  }
}
