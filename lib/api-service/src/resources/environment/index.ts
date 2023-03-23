import { createEnvironmentEndpoints } from './http';
import { HttpClientProtocol } from '../../protocols/HttpClient';
import { createEnvironmentQueries } from './queries';
import { createEnvironmentMutations } from './mutations';

export function createEnvironmentResource(httpClient: HttpClientProtocol) {
  const endpoints = createEnvironmentEndpoints(httpClient);
  const queries = createEnvironmentQueries(endpoints);
  const mutations = createEnvironmentMutations(endpoints);

  return {
    endpoints,
    queries,
    mutations,
  };
}
