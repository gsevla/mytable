import { HttpClientProtocol } from '../../protocols/HttpClient';
import { createReservationOrderEndpoints } from './http';
import { createReservationOrderMutations } from './mutations';
import { createReservationOrderQueries } from './queries';

export function createReservationOrderResource(httpClient: HttpClientProtocol) {
  const endpoints = createReservationOrderEndpoints(httpClient);
  const queries = createReservationOrderQueries(endpoints);
  const mutations = createReservationOrderMutations(endpoints);

  return {
    endpoints,
    queries,
    mutations,
  };
}
