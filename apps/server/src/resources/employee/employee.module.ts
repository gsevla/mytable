import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { EmployeeService } from './employee.service';
import { EmployeeController } from './employee.controller';
import { JwtStrategy } from '../auth/jwt.strategy';
import { AuthValidator } from '../auth/validator';

@Module({
  controllers: [EmployeeController],
  providers: [EmployeeService, PrismaService, JwtStrategy, AuthValidator],
})
export class EmployeeModule {}
