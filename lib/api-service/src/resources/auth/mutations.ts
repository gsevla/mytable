import { MutationFunction, useMutation } from 'react-query';
import type {
  AuthenticateEmployeeInput,
  Client,
  CreateClientInput,
  EmployeeWithoutPassword,
} from '@mytable/domain';
import { createAuthEndpoints } from './http';
import type { MutationOptions } from '../../protocols/MutationOptions';
import { MutationResult } from '../../protocols/QueryClient';

export function createAuthMutations(
  authEndpoints: ReturnType<typeof createAuthEndpoints>
) {
  function useSignInClient(
    options: MutationOptions<Client> = {}
  ): MutationResult<Client, string> {
    const { data, isLoading, mutate } = useMutation<Client, unknown, string>(
      authEndpoints.signInClient as unknown as MutationFunction<Client, string>,
      {
        ...options,
      }
    );

    return {
      data,
      isLoading,
      mutate,
    };
  }

  function useSignUpClient(
    options: MutationOptions<Client> = {}
  ): MutationResult<Client, CreateClientInput> {
    const { data, isLoading, mutate } = useMutation<
      Client,
      unknown,
      CreateClientInput
    >(
      authEndpoints.signUpClient as unknown as MutationFunction<
        Client,
        CreateClientInput
      >,
      { ...options }
    );

    return {
      data,
      isLoading,
      mutate,
    };
  }

  function useSignInEmployee(
    options: MutationOptions<EmployeeWithoutPassword> = {}
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
