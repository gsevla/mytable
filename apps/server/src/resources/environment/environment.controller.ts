import { Controller, Get, Post, Body, Patch, Param } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { EnvironmentService } from './environment.service';
import { CreateEnvironmentDto } from './dto/create-environment.dto';
import { UpdateEnvironmentDto } from './dto/update-environment.dto';
import { CreateEnvironmentWithImagesDto } from './dto/create-environment-with-images.dto';
import { UpdateEnvironmentWithImagesDto } from './dto/update-environment-with-images.dto';

@Controller('environment')
@ApiTags('environment')
export class EnvironmentController {
  constructor(private readonly environmentService: EnvironmentService) {}

  @Post()
  create(@Body() createEnvironmentDto: CreateEnvironmentDto) {
    return this.environmentService.create(createEnvironmentDto);
  }

  @Post('with-image')
  createWithImages(
    @Body() createEnvironmentWithImagesDto: CreateEnvironmentWithImagesDto
  ) {
    return this.environmentService.createWithImages(
      createEnvironmentWithImagesDto
    );
  }

  @Get()
  findAll() {
    return this.environmentService.findAll();
  }

  @Get('with-image')
  findAllWithImage() {
    return this.environmentService.findAllWithImage();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.environmentService.findOne(+id);
  }

  @Get('with-image/:id')
  findOneWithImage(@Param('id') id: string) {
    return this.environmentService.findOneWithImage(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateEnvironmentDto: UpdateEnvironmentDto
  ) {
    return this.environmentService.update(+id, updateEnvironmentDto);
  }

  @Patch('with-image/:id')
  updateWithImages(
    @Param('id') id: string,
    @Body() updateEnvironmentWithImagesDto: UpdateEnvironmentWithImagesDto
  ) {
    return this.environmentService.updateWithImages(
      +id,
      updateEnvironmentWithImagesDto
    );
  }
}
