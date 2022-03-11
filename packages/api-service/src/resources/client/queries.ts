import { ClientDto } from '@mytable/dtos';
import { AxiosError, AxiosResponse } from 'axios';
import { useQuery, UseQueryOptions } from 'react-query';
import { createClientEndpoints } from './http';
import { clientQueryKeys } from './keys';

export function createClientQueries(
  clientEndpoints: ReturnType<typeof createClientEndpoints>,
) {
  function useQueryClientByCpf(
    cpf: string,
    options?: UseQueryOptions<
      ClientDto.IClient,
      AxiosError<{
        error: string;
        message: string;
        statusCode: number;
      }>
    >,
  ) {
    const _queryKey = [clientQueryKeys.clientByCpf, cpf];

    return useQuery<ClientDto.IClient, AxiosError>(
      _queryKey,
      ({ queryKey }) => clientEndpoints.getClientByCpf(queryKey[1] as string),
      options,
    );
  }

  function useQueryClientById(
    id: number,
    options?: UseQueryOptions<ClientDto.IClient, AxiosError>,
  ) {
    const _queryKey = [clientQueryKeys.clientByCpf, id];

    return useQuery<ClientDto.IClient, AxiosError>(
      _queryKey,
      ({ queryKey }) => clientEndpoints.getClientById(queryKey[1] as number),
      options,
    );
  }

  return {
    useQueryClientByCpf,
    useQueryClientById,
  };
}
