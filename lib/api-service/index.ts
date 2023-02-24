import { createAuth } from './src/auth';
import { createResources } from './src/resources';
import { queryClient, QueryClientProvider } from './src/queryClient';
import { AxiosHttpClientAdapter } from './src/infra/adapters/AxiosHttpClientAdapter';

export function createApiService(baseURL: string) {
  const httpClient = new AxiosHttpClientAdapter(baseURL);

  const auth = createAuth(httpClient);

  const resources = createResources(httpClient);

  return {
    httpClient,
    queryClient,
    QueryClientProvider,
    auth,
    resources,
  };
}
