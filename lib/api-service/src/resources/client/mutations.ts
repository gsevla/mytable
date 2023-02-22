import { useMutation } from 'react-query';
import { CreateClientInput } from '#domain/entities/Client';
import { MutationOptions } from '../../protocols/MutationOptions';
import { createClientEndpoints } from './http';

export function createClientMutations(
  clientEndpoints: ReturnType<typeof createClientEndpoints>
) {
  function useCreateClient(options: MutationOptions = {}) {
    return useMutation(
      (client: CreateClientInput) => clientEndpoints.createClient(client),
      options
    );
  }

  return {
    useCreateClient,
  };
}
