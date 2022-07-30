import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateEnvironmentDto } from './dto/create-environment.dto';
import { UpdateEnvironmentDto } from './dto/update-environment.dto';

@Injectable()
export class EnvironmentService {
  constructor(private prismaService: PrismaService) {}

  create(createEnvironmentDto: CreateEnvironmentDto) {
    return this.prismaService.environment.create({
      data: {
        ...createEnvironmentDto,
        restaurantId: 1,
      },
    });
  }

  findAll() {
    return this.prismaService.environment.findMany();
  }

  findAllWithImage() {
    return this.prismaService.environment.findMany({
      include: {
        EnvironmentImage: true,
      },
    });
  }

  findOne(id: number) {
    return this.prismaService.environment.findUnique({
      where: {
        id,
      },
    });
  }

  findOneWithImage(id: number) {
    return this.prismaService.environment.findUnique({
      where: {
        id,
      },
      include: {
        EnvironmentImage: true,
      },
    });
  }

  update(id: number, updateEnvironmentDto: UpdateEnvironmentDto) {
    return this.prismaService.environment.update({
      where: {
        id,
      },
      data: updateEnvironmentDto,
    });
  }

  remove(id: number) {
    return this.prismaService.environment.delete({
      where: {
        id,
      },
    });
  }
}
