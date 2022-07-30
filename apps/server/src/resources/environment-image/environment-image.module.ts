import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { EnvironmentImageService } from './environment-image.service';
import { EnvironmentImageController } from './environment-image.controller';

@Module({
  controllers: [EnvironmentImageController],
  providers: [EnvironmentImageService, PrismaService],
})
export class EnvironmentImageModule {}
