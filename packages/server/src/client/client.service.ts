import { Injectable } from '@nestjs/common';
import { Client, Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ClientService {
  constructor(private prismaService: PrismaService) {}

  async createClient(data: Prisma.ClientCreateInput): Promise<Client> {
    return this.prismaService.client.create({ data });
  }
}
