import { HttpClientProtocol } from '../protocols/HttpClient';
import { createClientResource } from './client';
import { createEmployeeResource } from './employee';
import { createRestaurantResource } from './restaurant';
import { createEnvironmentResource } from './environment';
import { createEnvironmentImageResource } from './environment-image';

export function createResources(httpClient: HttpClientProtocol) {
  const resources = {
    client: createClientResource(httpClient),
    restaurant: createRestaurantResource(httpClient),
    employee: createEmployeeResource(httpClient),
    environment: createEnvironmentResource(httpClient),
    environmentImage: createEnvironmentImageResource(httpClient),
  };

  return resources;
}
