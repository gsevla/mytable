import { HttpClientProtocol } from '../../protocols/HttpClient';
import { SocketClientProtocol } from '../../protocols/SocketClient';
import { createWaitingQueueEndpoints } from './http';
import { waitingQueueQueryKeys } from './keys';
import { createWaitingQueueMutations } from './mutations';
import { createWaitingQueueQueries } from './queries';

export function createWaitingQueueResource(
  httpClient: HttpClientProtocol,
  socketClient: SocketClientProtocol
) {
  const endpoints = createWaitingQueueEndpoints(httpClient);
  // const events = createReservationOrderEventListeners(socketClient);
  const queries = createWaitingQueueQueries(endpoints);
  const mutations = createWaitingQueueMutations(endpoints);

  return {
    endpoints,
    queries,
    mutations,
    queryKeys: waitingQueueQueryKeys,
    // events,
  };
}
