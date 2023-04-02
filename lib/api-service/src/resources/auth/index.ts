import { HttpClientProtocol } from '../../protocols/HttpClient';
import { createAuthEndpoints } from './http';
import { createAuthMutations } from './mutations';

export function createAuth(httpClient: HttpClientProtocol) {
  const endpoints = createAuthEndpoints(httpClient);
  const mutations = createAuthMutations(endpoints);

  return {
    endpoints,
    mutations,
  };
}
