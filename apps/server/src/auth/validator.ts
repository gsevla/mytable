import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Client, Employee } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { decryptPassword } from '../utils/password';

@Injectable()
export class AuthValidator {
  constructor(private prismaService: PrismaService) {}

  async validateClient(cpf: string): Promise<Client | null> {
    const dbClient = await this.prismaService.client.findUnique({
      where: {
        cpf,
      },
    });

    if (!dbClient) {
      throw new UnauthorizedException(
        'Verifique seus dados e tente novamente.',
        'Acesso não autorizado!'
      );
    }

    return dbClient;
  }

  async validateEmployee(
    username: string,
    password: string
  ): Promise<Employee | null> {
    const dbEmployee = await this.prismaService.employee.findUnique({
      where: {
        username,
      },
    });

    if (!dbEmployee) {
      throw new UnauthorizedException(
        'Verifique seus dados e tente novamente.',
        'Acesso não autorizado!'
      );
    }

    const passwordMatch = await decryptPassword(password, dbEmployee.password);

    if (!passwordMatch) {
      throw new UnauthorizedException(
        'Verifique seus dados e tente novamente.',
        'Acesso não autorizado!'
      );
    }
    delete dbEmployee.password;

    if (!dbEmployee.enabled) {
      throw new UnauthorizedException(
        'Você não está autorizado a logar.',
        'Acesso não autorizado!'
      );
    }

    return dbEmployee;
  }
}
