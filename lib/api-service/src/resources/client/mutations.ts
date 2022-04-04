import { ClientDto } from '@mytable/dtos';
import { AxiosError } from 'axios';
import { useMutation, UseMutationOptions } from 'react-query';
import { createClientEndpoints } from './http';

export function createClientMutations(
  clientEndpoints: ReturnType<typeof createClientEndpoints>,
) {
  function useCreateClientMutation(
    options?: UseMutationOptions<
      ClientDto.IClient,
      AxiosError,
      ClientDto.ICreateClient
    >,
  ) {
    return useMutation<ClientDto.IClient, AxiosError, ClientDto.ICreateClient>(
      clientEndpoints.createClient,
      options,
    );
  }

  return {
    useCreateClientMutation,
  };
}
