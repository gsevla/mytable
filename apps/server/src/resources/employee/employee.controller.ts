import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { EmployeeRole } from '@mytable/domain';
import { EmployeeService } from './employee.service';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { EmployeeEntity } from './entities/employee.entity';
import { EmployeeGuard } from './employee-guard';
import { EmployeeRoleScope } from './scopes';

@Controller('employee')
@ApiTags('employee')
@ApiBearerAuth()
@EmployeeRoleScope(EmployeeRole.ADMIN)
@UseGuards(EmployeeGuard)
export class EmployeeController {
  constructor(private readonly employeeService: EmployeeService) {}

  @Post()
  @ApiCreatedResponse({ type: EmployeeEntity })
  @ApiConflictResponse()
  create(@Body() createEmployeeDto: CreateEmployeeDto) {
    return this.employeeService.create(createEmployeeDto);
  }

  @Get()
  @ApiOkResponse()
  findAll() {
    return this.employeeService.findAll();
  }

  @Get(':id')
  @ApiNotFoundResponse()
  @ApiOkResponse()
  findOne(@Param('id') id: string) {
    return this.employeeService.findOne(+id);
  }

  @Patch(':id')
  @ApiNotFoundResponse()
  @ApiOkResponse()
  update(
    @Param('id') id: string,
    @Body() updateEmployeeDto: UpdateEmployeeDto
  ) {
    return this.employeeService.update(+id, updateEmployeeDto);
  }

  // @Delete(':id')
  // @ApiNotFoundResponse()
  // @ApiOkResponse()
  // remove(@Param('id') id: string) {
  //   return this.employeeService.remove(parseInt(id, 10));
  // }
}
