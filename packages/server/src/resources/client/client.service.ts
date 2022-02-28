import { Injectable, NotFoundException } from '@nestjs/common';
import { Client, Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ClientService {
  constructor(private prismaService: PrismaService) {}

  createClient(data: Prisma.ClientCreateInput): Promise<Client> {
    data.cpf = data.cpf.split('.').join('').split('-').join('');

    return this.prismaService.client.create({ data });
  }

  async getClientById(clientId: number) {
    const dbClient = this.prismaService.client.findUnique({
      where: { id: clientId },
    });

    if (!dbClient) {
      throw new NotFoundException('Cliente não encontado!');
    }

    return dbClient;
  }

  async getClientByCpf(clientCpf: string) {
    const dbClient = await this.prismaService.client.findUnique({
      where: { cpf: clientCpf },
    });

    if (!dbClient) {
      throw new NotFoundException('Cliente não encontado!');
    }

    return dbClient;
  }
}
