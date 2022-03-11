import {
  QueryClient,
  QueryClientProvider,
  QueryClientProviderProps,
} from 'react-query';

export const queryClient = new QueryClient();

export function createQueryClientProvider(
  props: React.PropsWithChildren<Omit<QueryClientProviderProps, 'client'>>,
) {
  return QueryClientProvider({ client: queryClient, ...props });
}
