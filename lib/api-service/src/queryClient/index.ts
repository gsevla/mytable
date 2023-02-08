import {
  QueryClient,
  QueryClientProvider as Provider,
  QueryClientProviderProps,
} from 'react-query';

export const queryClient = new QueryClient();

export function createQueryClientProvider(
  props: React.PropsWithChildren<Omit<QueryClientProviderProps, 'client'>>
) {
  return Provider({ client: queryClient, ...props });
}

export function QueryClientProvider({ children }) {
  return Provider({ client: queryClient, children });
}
