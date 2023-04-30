import { createResources } from './src/resources';
import { queryClient, QueryClientProvider } from './src/queryClient';
import { AxiosHttpClientAdapter } from './src/infra/adapters/AxiosHttpClientAdapter';
import { useQuery } from './src/hooks/useQuery';
import { useMutation } from './src/hooks/useMutation';
import type { MutationOptions } from './src/protocols/MutationOptions';
import type { QueryOptions } from './src/protocols/QueryOptions';
import { SocketIoClientAdapter } from './src/infra/adapters/SocketIoClientAdapter';

export function createApiService(baseURL: string, socketUrl: string) {
  const httpClient = new AxiosHttpClientAdapter(baseURL);
  const socketClient = new SocketIoClientAdapter(socketUrl);

  const resources = createResources(httpClient, socketClient);

  return {
    httpClient,
    socketClient,
    queryClient,
    QueryClientProvider,
    resources,
    useQuery,
    useMutation,
  };
}

export type { MutationOptions, QueryOptions };
