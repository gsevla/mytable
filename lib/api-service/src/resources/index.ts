import { HttpClientProtocol } from '../protocols/HttpClient';
import { createClientResource } from './client';
import { createEmployeeResource } from './employee';
import { createRestaurantResource } from './restaurant';

export function createResources(httpClient: HttpClientProtocol) {
  const resources = {
    client: createClientResource(httpClient),
    restaurant: createRestaurantResource(httpClient),
    employee: createEmployeeResource(httpClient),
  };

  return resources;
}
