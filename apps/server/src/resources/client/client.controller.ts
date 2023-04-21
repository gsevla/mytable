import { Controller, Get, Param, Delete } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { ClientService } from './client.service';
import { ClientEntity } from './entities/client.entity';

@Controller('client')
@ApiTags('client')
@ApiBearerAuth()
@ApiUnauthorizedResponse({ description: 'Unauthorized' })
export class ClientController {
  constructor(private clientService: ClientService) {}

  @ApiOkResponse({
    description: 'Return a client',
    type: ClientEntity,
  })
  @ApiNotFoundResponse({ description: 'Client not found' })
  @Get(':id')
  getClientById(@Param('id') id: string) {
    return this.clientService.getClientById(parseInt(id, 10));
  }

  @ApiOkResponse({ description: 'Return a client', type: ClientEntity })
  @ApiNotFoundResponse({ description: 'Client not found' })
  @Get('cpf/:cpf')
  getClientByCpf(@Param('cpf') cpf: string) {
    return this.clientService.getClientByCpf(cpf);
  }

  @Delete(':id')
  deleteClient(@Param('id') id: string) {
    return this.clientService.deleteClient(parseInt(id, 10));
  }
}
