import { createRestaurantEndpoints } from './http';
import { HttpClientProtocol } from '../../protocols/HttpClient';
import { createRestaurantQueries } from './queries';

export function createRestaurantResource(httpClient: HttpClientProtocol) {
  const restaurantEndpoints = createRestaurantEndpoints(httpClient);
  const restaurantQueries = createRestaurantQueries(restaurantEndpoints);

  return {
    restaurantEndpoints,
    restaurantQueries,
  };
}
