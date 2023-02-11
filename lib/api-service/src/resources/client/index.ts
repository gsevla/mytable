// import { AxiosInstance } from 'axios';
import { SwaggerClientProtocol } from '../../protocols/swaggerClient';
// import { createClientEndpoints } from './http';
import { createClientMutations } from './mutations';
import { createClientQueries } from './queries';

export function createClientResource(swaggerClient: SwaggerClientProtocol) {
  // const clientEndpoints = createClientEndpoints(axiosInstance);
  const { client: clientEndpoints } = swaggerClient;
  const clientQueries = createClientQueries(clientEndpoints);
  const clientMutations = createClientMutations(clientEndpoints);

  return {
    clientEndpoints,
    clientQueries,
    clientMutations,
  };
}
