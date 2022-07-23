import { Body, Controller, Get, Param, Patch } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiNoContentResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { UpdateRestaurantDto } from './dto/update-restaurant.dto';
import { RestaurantService } from './restaurant.service';

@Controller('restaurant')
@ApiTags('restaurant')
export class RestaurantController {
  constructor(private restaurantService: RestaurantService) {}

  @Get()
  getRestaurant() {
    return this.restaurantService.getRestaurant();
  }

  @ApiBearerAuth()
  @ApiNoContentResponse()
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @Patch(':id')
  updateRestaurant(
    @Param('id') id: string,
    @Body() restaurant: UpdateRestaurantDto
  ) {
    return this.restaurantService.updateRestaurant(
      parseInt(id, 10),
      restaurant
    );
  }
}
