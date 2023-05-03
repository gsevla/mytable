import { createRestaurantEndpoints } from './http';
import { HttpClientProtocol } from '../../protocols/HttpClient';
import { createRestaurantQueries } from './queries';
import { createRestaurantMutations } from './mutations';
import { restaurantQueryKeys } from './keys';

export function createRestaurantResource(httpClient: HttpClientProtocol) {
  const endpoints = createRestaurantEndpoints(httpClient);
  const queries = createRestaurantQueries(endpoints);
  const mutations = createRestaurantMutations(endpoints);

  return {
    endpoints,
    queries,
    mutations,
    queryKeys: restaurantQueryKeys,
  };
}
