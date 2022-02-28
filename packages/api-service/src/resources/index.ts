import { AxiosInstance } from 'axios';
import { createClientEndpoints } from './client';
import { createRestaurantEndpoints } from './restaurant';

export function createResourcesEndpoints(axiosInstance: AxiosInstance) {
  const resources = {
    client: createClientEndpoints(axiosInstance),
    restaurant: createRestaurantEndpoints(axiosInstance),
  };

  return resources;
}
