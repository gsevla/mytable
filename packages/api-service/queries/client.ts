import { useQuery, UseQueryOptions } from 'react-query';

export function useClient<T = unknown>(endpoint: any) {
  const queryKey = 'client';
  const { data, isLoading, error } = useQuery(queryKey, endpoint);

  return { data, isLoading, error };
}
