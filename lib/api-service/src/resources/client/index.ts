import { HttpClientProtocol } from '../../protocols/HttpClient';
import { createClientEndpoints } from './http';
import { createClientMutations } from './mutations';
import { createClientQueries } from './queries';

export function createClientResource(httpClient: HttpClientProtocol) {
  const clientEndpoints = createClientEndpoints(httpClient);
  const clientQueries = createClientQueries(clientEndpoints);
  // const clientMutations = createClientMutations(clientEndpoints);

  return {
    clientEndpoints,
    clientQueries,
    // clientMutations,
  };
}
