import { AxiosInstance } from 'axios';
import { createAuthEndpoints } from './http';
import { createAuthMutations } from './mutations';

export function createAuth(axiosInstance: AxiosInstance) {
  const authEndpoints = createAuthEndpoints(axiosInstance);
  const authMutations = createAuthMutations(authEndpoints);

  return {
    authEndpoints,
    authMutations,
  };
}
