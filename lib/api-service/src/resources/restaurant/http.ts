import { Restaurant } from '@mytable/domain';
import { HttpClientProtocol } from '../../protocols/HttpClient';

export function createRestaurantEndpoints(httpClient: HttpClientProtocol) {
  const url = '/restaurant';

  async function getRestaurant() {
    const response = await httpClient.get<Restaurant>(url);
    return response;
  }

  return {
    getRestaurant,
  };
}
