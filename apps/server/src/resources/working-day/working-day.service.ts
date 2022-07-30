import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateWorkingDayDto } from './dto/create-working-day.dto';
import { UpdateWorkingDayDto } from './dto/update-working-day.dto';

@Injectable()
export class WorkingDayService {
  constructor(private prismaService: PrismaService) {}

  private static isTimeValid(
    workingDay: CreateWorkingDayDto | UpdateWorkingDayDto
  ): boolean {
    const [openingHour, openingMinute] = workingDay.openingTime.split(':');
    const [closingHour, closingMinute] = workingDay.closingTime.split(':');

    const numberedOpeningHour = parseInt(openingHour, 10);
    const numberedOpeningMinute = parseInt(openingMinute, 10);
    const numberedClosingHour = parseInt(closingHour, 10);
    const numberedClosingMinute = parseInt(closingMinute, 10);

    const openingDate = new Date(
      new Date(new Date().setHours(numberedOpeningHour)).setMinutes(
        numberedOpeningMinute
      )
    ).getTime();
    const closingDate = new Date(
      new Date(new Date().setHours(numberedClosingHour)).setMinutes(
        numberedClosingMinute
      )
    ).getTime();

    if (closingDate >= openingDate) {
      throw new BadRequestException(
        'A hora final não pode ser maior do que a hora inicial.'
      );
    }

    return true;
  }

  create(createWorkingDayDto: CreateWorkingDayDto) {
    WorkingDayService.isTimeValid(createWorkingDayDto);

    return this.prismaService.workingDays.create({
      data: { ...createWorkingDayDto, restaurantId: 1 },
    });
  }

  findAll() {
    return this.prismaService.workingDays.findMany();
  }

  findOne(id: number) {
    return this.prismaService.workingDays.findUnique({
      where: {
        id,
      },
    });
  }

  update(id: number, updateWorkingDayDto: UpdateWorkingDayDto) {
    WorkingDayService.isTimeValid(updateWorkingDayDto);

    return this.prismaService.workingDays.update({
      where: {
        id,
      },
      data: updateWorkingDayDto,
    });
  }

  remove(id: number) {
    return this.prismaService.workingDays.delete({
      where: {
        id,
      },
    });
  }
}
