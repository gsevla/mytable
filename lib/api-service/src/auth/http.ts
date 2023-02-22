import type {
  Client,
  CreateClientInput,
  CreateClientOutput,
} from '#domain/entities/Client';
import {
  HttpClientProtocol,
  HttpOperationResult,
} from '../protocols/HttpClient';

export function createAuthEndpoints(httpClient: HttpClientProtocol) {
  const url = '/auth';

  async function signInClient(cpf: string): HttpOperationResult<Client> {
    const response = await httpClient.post<Client>(`${url}/sign-in`, {
      cpf,
    });
    return response;
  }

  async function signUpClient(
    client: CreateClientInput
  ): HttpOperationResult<CreateClientOutput> {
    const response = await httpClient.post<CreateClientOutput>(
      `${url}/sign-up`,
      client
    );
    return response;
  }

  return {
    signInClient,
    signUpClient,
  };
}
