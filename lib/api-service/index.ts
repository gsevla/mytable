import { createResources } from './src/resources';
import { queryClient, QueryClientProvider } from './src/queryClient';
import { AxiosHttpClientAdapter } from './src/infra/adapters/AxiosHttpClientAdapter';
import { useQuery } from './src/hooks/useQuery';
import { useMutation } from './src/hooks/useMutation';
import type { MutationOptions } from './src/protocols/MutationOptions';
import type { QueryOptions } from './src/protocols/QueryOptions';

export function createApiService(baseURL: string) {
  const httpClient = new AxiosHttpClientAdapter(baseURL);

  const resources = createResources(httpClient);

  return {
    httpClient,
    queryClient,
    QueryClientProvider,
    auth,
    resources,
    useQuery,
    useMutation,
  };
}

export type { MutationOptions, QueryOptions };
