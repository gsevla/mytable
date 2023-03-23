import { createEnvironmentImageEndpoints } from './http';
import { HttpClientProtocol } from '../../protocols/HttpClient';
import { createEnvironmentImageQueries } from './queries';
import { createEnvironmentImageMutations } from './mutations';

export function createEnvironmentImageResource(httpClient: HttpClientProtocol) {
  const endpoints = createEnvironmentImageEndpoints(httpClient);
  const queries = createEnvironmentImageQueries(endpoints);
  const mutations = createEnvironmentImageMutations(endpoints);

  return {
    endpoints,
    queries,
    mutations,
  };
}
