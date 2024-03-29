import {
  Controller,
  Get,
  // Post,
  Body,
  Patch,
  Param,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { WorkingDayService } from './working-day.service';
// import { CreateWorkingDayDto } from './dto/create-working-day.dto';
import { UpdateWorkingDayDto } from './dto/update-working-day.dto';

@Controller('working-day')
@ApiTags('working-day')
export class WorkingDayController {
  constructor(private readonly workingDayService: WorkingDayService) {}

  // @Post()
  // create(@Body() createWorkingDayDto: CreateWorkingDayDto) {
  //   return this.workingDayService.create(createWorkingDayDto);
  // }

  @Get()
  findAll() {
    return this.workingDayService.findAll();
  }

  @Get('enabled')
  findAllEnabled() {
    return this.workingDayService.findAll();
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateWorkingDayDto: UpdateWorkingDayDto
  ) {
    return this.workingDayService.update(+id, updateWorkingDayDto);
  }
}
