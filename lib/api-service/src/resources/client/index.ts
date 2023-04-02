import { HttpClientProtocol } from '../../protocols/HttpClient';
import { createClientEndpoints } from './http';
import { createClientQueries } from './queries';

export function createClientResource(httpClient: HttpClientProtocol) {
  const endpoints = createClientEndpoints(httpClient);
  const queries = createClientQueries(endpoints);

  return {
    endpoints,
    queries,
  };
}
