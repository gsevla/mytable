import { AxiosInstance } from 'axios';
import { createRestaurantEndpoints } from './http';
import { createRestaurantQueries } from './queries';

export function createRestaurantResource(axiosInstance: AxiosInstance) {
  const restaurantEndpoints = createRestaurantEndpoints(axiosInstance);
  const restaurantQueries = createRestaurantQueries(restaurantEndpoints);

  return {
    restaurantEndpoints,
    restaurantQueries,
  };
}
