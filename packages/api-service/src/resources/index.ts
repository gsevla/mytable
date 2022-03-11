import { AxiosInstance } from 'axios';
import { createClientResource } from './client';
import { createRestaurantResource } from './restaurant';

export function createResources(axiosInstance: AxiosInstance) {
  const resources = {
    client: createClientResource(axiosInstance),
    restaurant: createRestaurantResource(axiosInstance),
  };

  return resources;
}
