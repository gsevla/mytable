import type {
  Client,
  CreateClientInput,
  CreateClientOutput,
} from '@mytable/domain';
import { HttpClientProtocol } from '../protocols/HttpClient';

export function createAuthEndpoints(httpClient: HttpClientProtocol) {
  const url = '/auth';

  async function signInClient(cpf: string) {
    const response = await httpClient.post<Client>(`${url}/sign-in`, {
      cpf,
    });
    return response;
  }

  async function signUpClient(client: CreateClientInput) {
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
