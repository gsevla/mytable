import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { EnvironmentImageService } from './environment-image.service';
import { CreateEnvironmentImageDto } from './dto/create-environment-image.dto';
import { UpdateEnvironmentImageDto } from './dto/update-environment-image.dto';

@Controller('environment-image')
@ApiTags('environment-image')
export class EnvironmentImageController {
  constructor(
    private readonly environmentImageService: EnvironmentImageService
  ) {}

  @Post()
  create(@Body() createEnvironmentImageDto: CreateEnvironmentImageDto) {
    return this.environmentImageService.create(createEnvironmentImageDto);
  }

  @Get()
  findAll() {
    return this.environmentImageService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.environmentImageService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateEnvironmentImageDto: UpdateEnvironmentImageDto
  ) {
    return this.environmentImageService.update(+id, updateEnvironmentImageDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.environmentImageService.remove(+id);
  }
}
