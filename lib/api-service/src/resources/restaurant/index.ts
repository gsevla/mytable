// import { AxiosInstance } from 'axios';
// import { createRestaurantEndpoints } from './http';
import { SwaggerClientProtocol } from '../../protocols/swaggerClient';
import { createRestaurantQueries } from './queries';

export function createRestaurantResource(swaggerClient: SwaggerClientProtocol) {
  const { restaurant: restaurantEndpoints } = swaggerClient;
  // const restaurantEndpoints = createRestaurantEndpoints(axiosInstance);
  const restaurantQueries = createRestaurantQueries(restaurantEndpoints);

  return {
    restaurantEndpoints,
    restaurantQueries,
  };
}
