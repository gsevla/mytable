import { useQuery } from 'react-query';
import { Client } from '@mytable/domain';
import { QueryOptions } from '../../protocols/QueryOptions';
import { createClientEndpoints } from './http';
import { clientQueryKeys } from './keys';
import { QueryResult } from '../../protocols/QueryClient';

export function createClientQueries(
  clientEndpoints: ReturnType<typeof createClientEndpoints>
) {
  function useClientWithCpf(
    cpf: string,
    options: QueryOptions = {}
  ): QueryResult<Client> {
    const key = [clientQueryKeys.clientByCpf, cpf];

    const { data, isLoading, isRefetching, refetch } = useQuery(
      key,
      ({ queryKey }) => clientEndpoints.getClientByCpf(queryKey[1]),
      options
    );

    return {
      data: data?.data,
      isLoading,
      isRefetching,
      refetch,
    };
  }

  function useClientWithId(id: number, options: QueryOptions = {}) {
    const key = [clientQueryKeys.clientByCpf, id];

    return useQuery(
      key,
      ({ queryKey }) => clientEndpoints.getClientById(queryKey[1] as number),
      options
    );
  }

  return {
    useClientWithCpf,
    useClientWithId,
  };
}
