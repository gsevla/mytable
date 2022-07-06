import { Body, Controller, Get, Param, Post, Response } from '@nestjs/common';
import { ClientService } from './client.service';
import { CreateClientDto } from './dto/create-client.dto';

@Controller('client')
export class ClientController {
  constructor(private clientService: ClientService) {}

  @Post()
  createClient(@Body() client: CreateClientDto) {
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
