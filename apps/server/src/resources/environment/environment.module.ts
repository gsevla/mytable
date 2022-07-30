import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { EnvironmentService } from './environment.service';
import { EnvironmentController } from './environment.controller';

@Module({
  controllers: [EnvironmentController],
  providers: [EnvironmentService, PrismaService],
})
export class EnvironmentModule {}
