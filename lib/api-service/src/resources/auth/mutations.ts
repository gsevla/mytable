import { useMutation } from 'react-query';
import type { CreateClientInput } from '@mytable/domain';
import { createAuthEndpoints } from './http';
import type { MutationOptions } from '../../protocols/MutationOptions';

export function createAuthMutations(
  authEndpoints: ReturnType<typeof createAuthEndpoints>
) {
  function useSignInClient(options: MutationOptions = {}) {
    return useMutation((cpf: string) => authEndpoints.signInClient(cpf), {
      ...options,
    });
  }

  function useSignUpClient(options: MutationOptions = {}) {
    return useMutation(
      (client: CreateClientInput) => authEndpoints.signUpClient(client),
      { ...options }
    );
  }

  return {
    useSignInClient,
    useSignUpClient,
  };
}
