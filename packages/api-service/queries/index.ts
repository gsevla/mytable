import { AxiosInstance } from 'axios';
import {
  QueryClient,
  QueryClientProvider,
  QueryClientProviderProps,
} from 'react-query';
import { createClientEndpoints } from '../src/resources/client';
import { createRestaurantEndpoints } from '../src/resources/restaurant';
import { useClient as _useClient } from './client';
import { useRestaurant as _useRestaurant } from './restaurant';

export const queryClient = new QueryClient();

export function createQueryClientProvider(
  props: React.PropsWithChildren<Omit<QueryClientProviderProps, 'client'>>,
) {
  return QueryClientProvider({ client: queryClient, ...props });
}

export function createQueries(axiosInstance: AxiosInstance) {
  const restaurantEndpoints = createRestaurantEndpoints(axiosInstance);
  const clientEndpoints = createClientEndpoints(axiosInstance);

  const queries = {
    useRestaurant: () => _useRestaurant(restaurantEndpoints.getRestaurant),
    useClient: (...params: Parameters<typeof clientEndpoints.getClientByCpf>) =>
      _useClient(() => clientEndpoints.getClientByCpf(...params)),
  };

  return queries;
}
