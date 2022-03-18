import { ClientDto } from '@mytable/dtos';
import { AxiosError } from 'axios';
import { useMutation, UseMutationOptions } from 'react-query';
import { createAuthEndpoints } from './http';

export function createAuthMutations(
  authEndpoints: ReturnType<typeof createAuthEndpoints>,
) {
  function useQuerySignInClient(
    options?: UseMutationOptions<
      ClientDto.IClient,
      AxiosError<{
        error: string;
        message: string;
        statusCode: number;
      }>,
      string
    >,
  ) {
    return useMutation<ClientDto.IClient, AxiosError, string>(
      authEndpoints.signInClient,
      options,
    );
  }

  function useQuerySignUpClient(
    options?: UseMutationOptions<
      ClientDto.IClient,
      AxiosError<{
        error: string;
        message: string;
        statusCode: number;
      }>,
      ClientDto.ICreateClient
    >,
  ) {
    return useMutation<ClientDto.IClient, AxiosError, ClientDto.ICreateClient>(
      authEndpoints.signUpClient,
      options,
    );
  }

  return {
    useQuerySignInClient,
    useQuerySignUpClient,
  };
}
