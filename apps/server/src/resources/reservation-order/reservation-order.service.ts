import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { ReservationOrderStatusEnum } from '@prisma/client';
import { CreateReservationOrderDto } from './dto/create-reservation-order.dto';
import { UpdateReservationOrderDto } from './dto/update-reservation-order.dto';

@Injectable()
export class ReservationOrderService {
  constructor(private prismaService: PrismaService) {}

  private static findRecommendedTimeSlots() {}

  create(createReservationOrderDto: CreateReservationOrderDto) {
    // need to check if we can create
    // match restaurant occupation date and time
    // check if it is an working day and it is opened
    // add future limitation like two weeks from now

    return this.prismaService.reservationOrder.create({
      include: {
        client: {
          select: {
            name: true,
            surname: true,
            identifier: true,
          },
        },
      },
      data: {
        ...createReservationOrderDto,
        restaurantId: 1,
        ReservationOrderHistory: {
          create: [
            {
              employeeId: 1,
              status: ReservationOrderStatusEnum.PENDING,
              peopleAmount: createReservationOrderDto.peopleAmount,
              date: createReservationOrderDto.date,
              startTime: createReservationOrderDto.startTime,
              endTime: createReservationOrderDto.endTime,
            },
          ],
        },
      },
    });
  }

  findAll() {
    return this.prismaService.reservationOrder.findMany({
      include: {
        client: {
          select: {
            name: true,
            surname: true,
            identifier: true,
          },
        },
      },
      orderBy: [
        {
          date: 'desc',
        },
      ],
    });
  }

  findAllFromClient(clientId: number) {
    return this.prismaService.reservationOrder.findMany({
      where: {
        clientId,
      },
    });
  }

  findOne(id: number) {
    return this.prismaService.reservationOrder.findUnique({
      where: {
        id,
      },
      include: {
        client: {
          select: {
            name: true,
            surname: true,
            identifier: true,
          },
        },
      },
    });
  }

  async update(
    id: number,
    updateReservationOrderDto: UpdateReservationOrderDto
  ) {
    // need to check if we can update
    // check time offset for modification
    // match restaurant occupation date and time
    // check if it is an working day and it is opened
    // add future limitation like two weeks from now
    const { reason } = updateReservationOrderDto;

    const dbReservationOrder =
      await this.prismaService.reservationOrder.findUnique({
        where: {
          id,
        },
      });

    if (!dbReservationOrder) {
      throw new NotFoundException(
        'Verifique os dados e tente novamente mais tarde.'
      );
    }

    return this.prismaService.reservationOrder.update({
      include: {
        client: {
          select: {
            name: true,
            surname: true,
            identifier: true,
          },
        },
      },
      where: {
        id,
      },
      data: {
        ...updateReservationOrderDto,
        ReservationOrderHistory: {
          create: [
            {
              employeeId: 1,
              status:
                updateReservationOrderDto.status ?? dbReservationOrder.status,
              reason,
              peopleAmount:
                updateReservationOrderDto.peopleAmount ??
                (dbReservationOrder.peopleAmount as number),
              date: updateReservationOrderDto.date ?? dbReservationOrder.date,
              startTime:
                updateReservationOrderDto.startTime ??
                dbReservationOrder.startTime,
              endTime:
                updateReservationOrderDto.endTime ?? dbReservationOrder.endTime,
            },
          ],
        },
      },
    });
  }

  remove(id: number) {
    // need to check if we can delete
    // check time offset for modification

    return this.prismaService.reservationOrder.delete({
      where: {
        id,
      },
    });
  }
}
