import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateEnvironmentImageDto } from './dto/create-environment-image.dto';
import { UpdateEnvironmentImageDto } from './dto/update-environment-image.dto';

@Injectable()
export class EnvironmentImageService {
  constructor(private prismaService: PrismaService) {}

  create(createEnvironmentImageDto: CreateEnvironmentImageDto) {
    return this.prismaService.environmentImage.create({
      data: {
        addr: createEnvironmentImageDto.addr,
        environmentId: createEnvironmentImageDto.environmentId,
        description: createEnvironmentImageDto.description,
      },
    });
  }

  findAll() {
    return this.prismaService.environmentImage.findMany();
  }

  findOne(id: number) {
    return this.prismaService.environmentImage.findUnique({
      where: {
        id,
      },
    });
  }

  update(id: number, updateEnvironmentImageDto: UpdateEnvironmentImageDto) {
    return this.prismaService.environmentImage.update({
      where: {
        id,
      },
      data: {
        addr: updateEnvironmentImageDto.addr,
        description: updateEnvironmentImageDto.description,
      },
    });
  }

  remove(id: number) {
    return this.prismaService.environmentImage.delete({
      where: {
        id,
      },
    });
  }
}
