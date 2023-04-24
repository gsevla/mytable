import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateEnvironmentWithImagesDto } from './dto/create-environment-with-images.dto';
import { CreateEnvironmentDto } from './dto/create-environment.dto';
import { UpdateEnvironmentWithImagesDto } from './dto/update-environment-with-images.dto';
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

  createWithImages(
    createEnvironmentWithImagesDto: CreateEnvironmentWithImagesDto
  ) {
    const { images, ...createEnvironmentDto } = createEnvironmentWithImagesDto;
    return this.prismaService.environment.create({
      data: {
        ...createEnvironmentDto,
        restaurantId: 1,
        images: {
          createMany: {
            data: images,
          },
        },
      },
      include: {
        images: true,
      },
    });
  }

  findAll() {
    return this.prismaService.environment.findMany({
      orderBy: {
        enabled: 'desc',
      },
    });
  }

  findAllWithImage() {
    return this.prismaService.environment.findMany({
      include: {
        images: true,
      },
      orderBy: {
        enabled: 'desc',
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
        images: {
          select: {
            id: true,
            addr: true,
            description: true,
          },
        },
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

  async updateWithImages(
    id: number,
    updateEnvironmentWithImagesDto: UpdateEnvironmentWithImagesDto
  ) {
    const { images, ...updateEnvironmentDto } = updateEnvironmentWithImagesDto;

    const dbEnvironmentEnvironmentImagesIds =
      await this.prismaService.environmentImage.findMany({
        where: {
          environmentId: id,
        },
        select: {
          id: true,
        },
      });

    const updatedImages = images
      .filter((image) => image.id)
      .map((image) => ({
        where: {
          id: image.id,
        },
        data: image,
      }));
    const createdImages = images.filter((image) => !image.id);
    const deletedImagesIds = dbEnvironmentEnvironmentImagesIds.filter(
      (dbEnvironmentImage) =>
        !images.some((image) => image.id === dbEnvironmentImage.id)
    );

    return this.prismaService.environment.update({
      where: {
        id,
      },
      data: {
        ...updateEnvironmentDto,
        images: {
          updateMany: updatedImages,
          createMany: {
            data: createdImages,
          },
          deleteMany: deletedImagesIds,
        },
      },
      include: {
        images: true,
      },
    });
  }
}
