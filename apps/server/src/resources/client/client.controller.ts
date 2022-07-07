import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { ClientService } from './client.service';
import { CreateClientDto } from './dto/create-client.dto';
import { ClientEntity } from './entities/client.entity';

@Controller('client')
@ApiTags('client')
@ApiBearerAuth()
@ApiUnauthorizedResponse({ description: 'Unauthorized' })
export class ClientController {
  constructor(private clientService: ClientService) {}

  @Post()
  @ApiCreatedResponse({
    description: 'Client created successfully',
    type: ClientEntity,
  })
  @ApiConflictResponse({
    description: "Client not created because it's data was already used",
  })
  createClient(@Body() client: CreateClientDto) {
    return this.clientService.createClient(client);
  }

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
}
