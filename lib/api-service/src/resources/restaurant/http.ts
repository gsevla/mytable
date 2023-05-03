import {
  Restaurant,
  RestaurantWithInfo,
  UpdateRestaurantInput,
} from '@mytable/domain';
import { HttpClientProtocol } from '../../protocols/HttpClient';

export function createRestaurantEndpoints(httpClient: HttpClientProtocol) {
  const url = '/restaurant';

  async function getRestaurant() {
    return httpClient.get<Restaurant>(url);
  }

  async function getRestaurantWithInfo() {
    return httpClient.get<RestaurantWithInfo>(`${url}/with-info`);
  }

  function updateRestaurant({ id, ...data }: UpdateRestaurantInput) {
    return httpClient.patch<Restaurant>(`${url}/${id}`, data);
  }

  return {
    getRestaurant,
    getRestaurantWithInfo,
    updateRestaurant,
  };
}
