import { AxiosInstance } from 'axios';
import { createClientEndpoints } from './http';
import { createClientMutations } from './mutations';
import { createClientQueries } from './queries';

export function createClientResource(axiosInstance: AxiosInstance) {
  const clientEndpoints = createClientEndpoints(axiosInstance);
  const clientQueries = createClientQueries(clientEndpoints);
  const clientMutations = createClientMutations(clientEndpoints);

  return {
    clientEndpoints,
    clientQueries,
    clientMutations,
  };
}
