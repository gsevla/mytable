import { Body, Controller, Get, Param, Post, Response } from '@nestjs/common';
import { Client } from '@prisma/client';
import { ClientService } from './client.service';

@Controller('client')
export class ClientController {
  constructor(private clientService: ClientService) {}

  @Post()
  createClient(@Body() client: Client) {
    return this.clientService.createClient(client);
  }

  @Get(':id')
  getClientById(@Param('id') id: string) {
    return this.clientService.getClientById(parseInt(id, 10));
  }

  @Get('cpf/:cpf')
  getClientByCpf(@Param('cpf') cpf: string, response: Response) {
    return this.clientService.getClientByCpf(cpf);
  }
}
