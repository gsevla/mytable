import { useQuery, UseQueryOptions } from 'react-query';

export function useRestaurant<T = unknown>(endpoint: any) {
  const queryKey = 'restaurant';
  const { data, isLoading, error } = useQuery(queryKey, endpoint);

  return { data, isLoading, error };
}
