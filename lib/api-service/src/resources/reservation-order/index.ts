import { HttpClientProtocol } from '../../protocols/HttpClient';
import { SocketClientProtocol } from '../../protocols/SocketClient';
import { createReservationOrderEventListeners } from './events';
import { createReservationOrderEndpoints } from './http';
import { reservationOrderQueryKeys } from './keys';
import { createReservationOrderMutations } from './mutations';
import { createReservationOrderQueries } from './queries';

export function createReservationOrderResource(
  httpClient: HttpClientProtocol,
  socketClient: SocketClientProtocol
) {
  const endpoints = createReservationOrderEndpoints(httpClient);
  const queries = createReservationOrderQueries(endpoints);
  const mutations = createReservationOrderMutations(endpoints);
  const events = createReservationOrderEventListeners(socketClient);

  return {
    endpoints,
    queries,
    mutations,
    queryKeys: reservationOrderQueryKeys,
    events,
  };
}
