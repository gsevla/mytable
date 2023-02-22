import { HttpClientProtocol } from '../protocols/HttpClient';
import { createAuthEndpoints } from './http';
import { createAuthMutations } from './mutations';

export function createAuth(httpClient: HttpClientProtocol) {
  const authEndpoints = createAuthEndpoints(httpClient);
  const authMutations = createAuthMutations(authEndpoints);

  return {
    authEndpoints,
    authMutations,
  };
}
