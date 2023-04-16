import { MutationFunction, useMutation } from 'react-query';
import type {
  AuthenticateEmployeeInput,
  CreateClientInput,
  EmployeeWithoutPassword,
} from '@mytable/domain';
import { createAuthEndpoints } from './http';
import type { MutationOptions } from '../../protocols/MutationOptions';
import { MutationResult } from '../../protocols/QueryClient';

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

  function useSignInEmployee(
    options: MutationOptions = {}
  ): MutationResult<EmployeeWithoutPassword, AuthenticateEmployeeInput> {
    const { data, isLoading, mutate } = useMutation<
      EmployeeWithoutPassword,
      unknown,
      AuthenticateEmployeeInput
    >(
      authEndpoints.signInEmployee as unknown as MutationFunction<
        EmployeeWithoutPassword,
        AuthenticateEmployeeInput
      >,
      { ...options }
    );

    return {
      data,
      isLoading,
      mutate,
    };
  }

  return {
    useSignInClient,
    useSignUpClient,
    useSignInEmployee,
  };
}
