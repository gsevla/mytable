import { HttpClientProtocol } from '../protocols/HttpClient';
import { createAuth } from './auth';
import { createClientResource } from './client';
import { createEmployeeResource } from './employee';
import { createRestaurantResource } from './restaurant';
import { createEnvironmentResource } from './environment';
import { createEnvironmentImageResource } from './environment-image';

export function createResources(httpClient: HttpClientProtocol) {
  const resources = {
    auth: createAuth(httpClient),
    client: createClientResource(httpClient),
    restaurant: createRestaurantResource(httpClient),
    employee: createEmployeeResource(httpClient),
    environment: createEnvironmentResource(httpClient),
    environmentImage: createEnvironmentImageResource(httpClient),
  };

  return resources;
}
