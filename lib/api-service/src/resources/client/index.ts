import { HttpClientProtocol } from '../../protocols/HttpClient';
import { createClientEndpoints } from './http';
import { createClientQueries } from './queries';

export function createClientResource(httpClient: HttpClientProtocol) {
  const clientEndpoints = createClientEndpoints(httpClient);
  const clientQueries = createClientQueries(clientEndpoints);

  return {
    clientEndpoints,
    clientQueries,
  };
}
