import { createRestaurantEndpoints } from './http';
import { HttpClientProtocol } from '../../protocols/HttpClient';
import { createRestaurantQueries } from './queries';

export function createRestaurantResource(httpClient: HttpClientProtocol) {
  const endpoints = createRestaurantEndpoints(httpClient);
  const queries = createRestaurantQueries(endpoints);

  return {
    endpoints,
    queries,
  };
}
