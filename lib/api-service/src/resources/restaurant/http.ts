import { Restaurant, RestaurantWithInfo } from '@mytable/domain';
import { HttpClientProtocol } from '../../protocols/HttpClient';

export function createRestaurantEndpoints(httpClient: HttpClientProtocol) {
  const url = '/restaurant';

  async function getRestaurant() {
    return httpClient.get<Restaurant>(url);
  }

  async function getRestaurantWithInfo() {
    return httpClient.get<RestaurantWithInfo>(`${url}/with-info`);
  }

  return {
    getRestaurant,
    getRestaurantWithInfo,
  };
}
