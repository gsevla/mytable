import {
  Injectable,
  NotFoundException,
  ForbiddenException,
  NotAcceptableException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { ReservationOrderStatusEnum } from '@prisma/client';
import { Day } from '@mytable/domain';
import { EventsService } from 'src/events/events.service';
import { CreateReservationOrderDto } from './dto/create-reservation-order.dto';
import { UpdateReservationOrderDto } from './dto/update-reservation-order.dto';

const TZ_OFFSET = -3 * 60 * 60 * 1000;

@Injectable()
export class ReservationOrderService {
  constructor(
    private prismaService: PrismaService,
    private eventsService: EventsService
  ) {}

  private static findRecommendedTimeSlots() {}

  private static mountDate({ date, time }: { date: string; time: string }) {
    const enUsDate = date.split('/').reverse().join('/');
    const innerDate = new Date(new Date(enUsDate).getTime() + TZ_OFFSET);

    const [hours, minutes] = time.split(':');

    if (hours) {
      innerDate.setHours(parseInt(hours, 10));
    }

    if (minutes) {
      innerDate.setMinutes(parseInt(minutes, 10));
    }

    return innerDate;
  }

  private async getEnvironmentOccupation(
    environmentId: number,
    date: string,
    startTime: string,
    endTime: string
  ) {
    const environmentOccupation = (
      await this.prismaService.reservationOrder.findMany({
        where: {
          AND: [
            {
              status: ReservationOrderStatusEnum.ACCEPTED,
            },
            {
              environmentId,
            },
            {
              date,
            },
            {
              startTime: {
                gte: startTime,
              },
            },
            {
              endTime: {
                lte: endTime,
              },
            },
          ],
        },
      })
    ).reduce((accu, reservationOrder) => {
      accu += reservationOrder.peopleAmount;
      return accu;
    }, 0);

    return environmentOccupation;
  }

  private static respectStateThreadmill(
    actualStatus: ReservationOrderStatusEnum,
    newStatus: ReservationOrderStatusEnum
  ) {
    if (!newStatus) return;

    if (actualStatus === ReservationOrderStatusEnum.PENDING) {
      if (
        newStatus !== ReservationOrderStatusEnum.ACCEPTED &&
        newStatus !== ReservationOrderStatusEnum.REJECTED
      ) {
        throw new NotAcceptableException(
          'A ordem de reserva somente pode ser Aceita ou Rejeitada.'
        );
      }
    }

    if (actualStatus === ReservationOrderStatusEnum.ACCEPTED) {
      if (
        newStatus !== ReservationOrderStatusEnum.DONE &&
        newStatus !== ReservationOrderStatusEnum.CANCELED
      ) {
        throw new NotAcceptableException(
          'A ordem de reserva somente pode ser Finalizada ou Cancelada.'
        );
      }
    }
  }

  private async ensureIsRestaurantOpened(
    date: string,
    startTime: string,
    endTime: string
  ) {
    // check if it is an working day and it is opened
    const startDate = ReservationOrderService.mountDate({
      date,
      time: startTime,
    });
    const endDate = ReservationOrderService.mountDate({ date, time: endTime });

    const weekDay = startDate.getDay();
    const weekDayMap = {
      0: Day.SUNDAY,
      1: Day.MONDAY,
      2: Day.TUESDAY,
      3: Day.WEDNESDAY,
      4: Day.THURSDAY,
      5: Day.FRIDAY,
      6: Day.SATURDAY,
    };

    const workingDay = await this.prismaService.workingDays.findUnique({
      where: {
        day: weekDayMap[weekDay],
      },
    });

    if (!workingDay.open) {
      throw new NotAcceptableException('O restaurante está fechado');
    }

    const openingDate = ReservationOrderService.mountDate({
      date,
      time: workingDay.openingTime,
    });
    const closingDate = ReservationOrderService.mountDate({
      date,
      time: workingDay.closingTime,
    });

    if (startDate.getTime() < openingDate.getTime()) {
      throw new NotAcceptableException('O restaurante ainda não está aberto.');
    }

    if (endDate.getTime() > closingDate.getTime()) {
      throw new NotAcceptableException('O restaurante está fechado.');
    }
  }

  private async ensureEnvironmentCanAttend(
    environmentId: number,
    peopleAmountToAdd: number,
    reservationOrderId: number | null,
    date: string,
    startTime: string,
    endTime: string
  ) {
    // match restaurant occupation date and time
    if (!peopleAmountToAdd) return;

    const environment = await this.prismaService.environment.findUnique({
      where: {
        id: environmentId,
      },
    });

    const environmentOccupation = await this.getEnvironmentOccupation(
      environment.id,
      date,
      startTime,
      endTime
    );

    const lastReservationOrderPeopleAmount = reservationOrderId
      ? (
          await this.prismaService.reservationOrderHistory.findFirst({
            where: {
              id: reservationOrderId,
            },
            take: -1,
          })
        )?.peopleAmount
      : 0;

    const environmentOccupationWithoutReservation =
      environmentOccupation - lastReservationOrderPeopleAmount;

    if (
      environmentOccupationWithoutReservation + peopleAmountToAdd >
      environmentOccupation
    ) {
      throw new NotAcceptableException(
        'O limite de pessoas nesse ambiente foi excedido.'
      );
    }
  }

  // private ensureMinimumDateNotExceeded(date: string, startTime: string) {
  //   // check if user have time to arrive like 2h minimum time to create
  // }

  // private ensureMaxDateLimitNotExceeded(date: string, endTime: string) {
  //   // add future limitation like two weeks from now
  // }

  async create(createReservationOrderDto: CreateReservationOrderDto) {
    await this.ensureIsRestaurantOpened(
      createReservationOrderDto.date,
      createReservationOrderDto.startTime,
      createReservationOrderDto.endTime
    );
    await this.ensureEnvironmentCanAttend(
      createReservationOrderDto.environmentId,
      createReservationOrderDto.peopleAmount,
      null,
      createReservationOrderDto.date,
      createReservationOrderDto.startTime,
      createReservationOrderDto.endTime
    );

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
        reservationOrderHistory: {
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
        {
          startTime: 'desc',
        },
      ],
    });
  }

  findAllActive() {
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
      where: {
        OR: [
          {
            status: ReservationOrderStatusEnum.PENDING,
          },
          {
            status: ReservationOrderStatusEnum.ACCEPTED,
          },
        ],
      },
      orderBy: [
        {
          date: 'desc',
        },
        {
          startTime: 'desc',
        },
      ],
    });
  }

  findAllHistory() {
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
      where: {
        OR: [
          {
            status: ReservationOrderStatusEnum.DONE,
          },
          {
            status: ReservationOrderStatusEnum.CANCELED,
          },
          {
            status: ReservationOrderStatusEnum.REJECTED,
          },
        ],
      },
      orderBy: [
        {
          date: 'asc',
        },
        {
          startTime: 'asc',
        },
      ],
    });
  }

  findAllFromClient(clientId: number) {
    return this.prismaService.reservationOrder.findMany({
      include: {
        environment: {
          select: {
            name: true,
          },
        },
      },
      where: {
        clientId,
      },
      orderBy: [
        {
          date: 'asc',
        },
        {
          startTime: 'asc',
        },
      ],
    });
  }

  findAllActiveFromClient(clientId: number) {
    return this.prismaService.reservationOrder.findMany({
      include: {
        environment: {
          select: {
            name: true,
          },
        },
      },
      where: {
        AND: [
          {
            clientId,
            OR: [
              {
                status: ReservationOrderStatusEnum.PENDING,
              },
              {
                status: ReservationOrderStatusEnum.ACCEPTED,
              },
            ],
          },
        ],
      },
      orderBy: [
        {
          date: 'asc',
        },
        {
          startTime: 'asc',
        },
      ],
    });
  }

  findAllHistoryFromClient(clientId: number) {
    return this.prismaService.reservationOrder.findMany({
      include: {
        environment: {
          select: {
            name: true,
          },
        },
        reservationOrderHistory: {
          take: -1,
          select: {
            reason: true,
          },
        },
      },
      where: {
        AND: [
          {
            clientId,
            OR: [
              {
                status: ReservationOrderStatusEnum.DONE,
              },
              {
                status: ReservationOrderStatusEnum.CANCELED,
              },
              {
                status: ReservationOrderStatusEnum.REJECTED,
              },
            ],
          },
        ],
      },
      orderBy: [
        {
          date: 'asc',
        },
        {
          startTime: 'asc',
        },
      ],
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
    // check time offset for modification
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

    await this.ensureIsRestaurantOpened(
      updateReservationOrderDto.date ?? dbReservationOrder.date,
      updateReservationOrderDto.startTime ?? dbReservationOrder.startTime,
      updateReservationOrderDto.endTime ?? dbReservationOrder.endTime
    );
    await this.ensureEnvironmentCanAttend(
      dbReservationOrder.environmentId,
      updateReservationOrderDto.peopleAmount,
      dbReservationOrder.id,
      updateReservationOrderDto.date ?? dbReservationOrder.date,
      updateReservationOrderDto.startTime ?? dbReservationOrder.startTime,
      updateReservationOrderDto.endTime ?? dbReservationOrder.endTime
    );
    ReservationOrderService.respectStateThreadmill(
      dbReservationOrder.status,
      updateReservationOrderDto.status
    );
    // this.ensureMinimumDateNotExceeded(updateReservationOrderDto.date, updateReservationOrderDto.startTime);
    // this.ensureMaxDateLimitNotExceeded(updateReservationOrderDto.date, updateReservationOrderDto.endTime)

    const updateResponse = await this.prismaService.reservationOrder.update({
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
        reservationOrderHistory: {
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

    this.eventsService.emitReservationOrderStatusChange(
      updateResponse.client.identifier,
      {
        id: updateResponse.id,
        status: updateResponse.status,
      }
    );

    return updateResponse;
  }

  async cancel(id: number, userId: number) {
    const dbReservationOrder =
      await this.prismaService.reservationOrder.findUnique({
        where: {
          id,
        },
      });

    if (dbReservationOrder.clientId !== userId) {
      throw new ForbiddenException(
        'Usuário não autorizado!',
        'A ordem de reserva não pertence ao usuário.'
      );
    }

    return this.prismaService.reservationOrder.update({
      where: {
        id,
      },
      data: {
        status: ReservationOrderStatusEnum.CANCELED,
        reservationOrderHistory: {
          create: [
            {
              employeeId: 1,
              status: ReservationOrderStatusEnum.CANCELED,
              peopleAmount: dbReservationOrder.peopleAmount,
              date: dbReservationOrder.date,
              startTime: dbReservationOrder.startTime,
              endTime: dbReservationOrder.endTime,
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
