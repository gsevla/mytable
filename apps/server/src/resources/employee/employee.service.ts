import {
  ConflictException,
  Injectable,
  NotFoundException,
  PreconditionFailedException,
} from '@nestjs/common';
import { Employee, Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { encryptPassword } from 'src/utils/password';
import { EmployeeRole } from '@mytable/domain';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';

@Injectable()
export class EmployeeService {
  constructor(private prismaService: PrismaService) {}

  private static removeProps(employee: Employee | Array<Employee>) {
    if (!employee) {
      return employee;
    }

    if (Array.isArray(employee)) {
      employee.forEach((_) => {
        delete _.password;
      });
    } else {
      delete employee.password;
    }

    return employee;
  }

  async create(createEmployeeDto: CreateEmployeeDto) {
    if (createEmployeeDto.password) {
      const newPassword = await encryptPassword(createEmployeeDto.password);
      createEmployeeDto.password = newPassword;
    }

    const dbEmployee = await this.prismaService.employee
      .create({
        data: {
          ...createEmployeeDto,
          restaurantId: 1 as never,
        },
      })
      .catch((error) => {
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
          if (error.code === 'P2002') {
            throw new ConflictException(
              'Desculpe, parece que esses dados já foram utilizados por outra pessoa.'
            );
          }
        }
        throw error;
      });

    return EmployeeService.removeProps(dbEmployee);
  }

  async findAll() {
    const dbEmployees = await this.prismaService.employee.findMany();

    return EmployeeService.removeProps(dbEmployees);
  }

  async findAllActiveAdmins() {
    const activeAdmins = await this.prismaService.employee.findMany({
      where: {
        enabled: true,
        role: EmployeeRole.ADMIN,
      },
    });

    return activeAdmins;
  }

  async findOne(id: number) {
    const dbEmployee = await this.prismaService.employee.findUnique({
      where: {
        id,
      },
    });

    if (!dbEmployee) {
      throw new NotFoundException(
        'Verifique os dados e tente novamente mais tarde.'
      );
    }

    return EmployeeService.removeProps(dbEmployee);
  }

  async update(id: number, updateEmployeeDto: UpdateEmployeeDto) {
    if (updateEmployeeDto.password) {
      updateEmployeeDto.password = await encryptPassword(
        updateEmployeeDto.password
      );
    }

    const activeAdmins = await this.findAllActiveAdmins();

    if (activeAdmins.length === 1) {
      if (
        updateEmployeeDto.enabled === false ||
        updateEmployeeDto.role === EmployeeRole.ORDINARY
      )
        throw new PreconditionFailedException(
          'Você é o único administrador ativo.',
          'Edição de usuário não permitida.'
        );
    }

    const dbEmployee = await this.prismaService.employee
      .update({
        where: {
          id,
        },
        data: updateEmployeeDto,
      })
      .catch((error) => {
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
          if (error.code === 'P2025') {
            throw new NotFoundException(
              'Verifique os dados e tente novamente mais tarde.'
            );
          }
        }
        throw error;
      });

    return EmployeeService.removeProps(dbEmployee);
  }

  // async remove(id: number) {
  //   const dbRemovedEmployee = await this.prismaService.employee
  //     .update({
  //       where: {
  //         id,
  //       },
  //       data: {
  //         enabled: false,
  //       },
  //     })
  //     .catch((error) => {
  //       if (error instanceof Prisma.PrismaClientKnownRequestError) {
  //         if (error.code === 'P2025') {
  //           throw new NotFoundException(
  //             'Verifique os dados e tente novamente mais tarde.'
  //           );
  //         }
  //       }
  //       throw error;
  //     });
  //
  //   return EmployeeService.removeProps(dbRemovedEmployee);
  // }
}
