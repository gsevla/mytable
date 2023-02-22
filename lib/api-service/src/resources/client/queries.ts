import { useQuery } from 'react-query';
import { QueryOptions } from '../../protocols/QueryOptions';
import { createClientEndpoints } from './http';
import { clientQueryKeys } from './keys';

export function createClientQueries(
  clientEndpoints: ReturnType<typeof createClientEndpoints>
) {
  function useClientWithCpf(cpf: string, options: QueryOptions = {}) {
    const key = [clientQueryKeys.clientByCpf, cpf];

    return useQuery(
      key,
      ({ queryKey }) => clientEndpoints.getClientByCpf(queryKey[1]),
      options
    );
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
