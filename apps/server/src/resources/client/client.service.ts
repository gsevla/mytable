import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Client, Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ClientService {
  constructor(private prismaService: PrismaService) {}

  async createClient(data: Prisma.ClientCreateInput): Promise<Client> {
    const normalizedCpf = data.cpf.split('.').join('').split('-').join('');

    const dbClient = await this.prismaService.client
      .create({ data: { ...data, cpf: normalizedCpf } })
      .catch((error) => {
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
          if (error.code === 'P2002') {
            throw new ConflictException(
              'Desculpe, parece que esses dados já foram utilizados por outra pessoa.',
              'Não foi possível completar o registro!'
            );
          }
        }
        throw error;
      });

    return dbClient;
  }

  async getClientById(clientId: number) {
    const dbClient = await this.prismaService.client.findUnique({
      where: { id: clientId },
    });

    if (!dbClient) {
      throw new NotFoundException(
        'Verifique os dados e tente novamente mais tarde.',
        'Cliente não encontado!'
      );
    }

    return dbClient;
  }

  async getClientByCpf(clientCpf: string) {
    const dbClient = await this.prismaService.client.findUnique({
      where: { cpf: clientCpf },
    });

    if (!dbClient) {
      throw new NotFoundException(
        'Verifique os dados e tente novamente mais tarde.',
        'Cliente não encontado!'
      );
    }

    return dbClient;
  }

  async deleteClient(clientId: number) {
    return this.prismaService.client.delete({
      where: {
        id: clientId,
      },
    });
  }
}
