import {
  Client,
  CreateClientInput,
  CreateClientOutput,
} from '#domain/entities/Client';
import { HttpClientProtocol } from '../../protocols/HttpClient';

export function createClientEndpoints(httpClient: HttpClientProtocol) {
  const url = '/client';

  // async function createClient(client: CreateClientInput) {
  //   const response = await httpClient.post<CreateClientOutput>(url, client);
  //   return response;
  // }

  async function getClientById(id: number) {
    const response = await httpClient.get<Client>(`${url}/${id}`);
    return response;
  }

  async function getClientByCpf(cpf: string) {
    const response = await httpClient.get<Client>(`${url}/cpf/${cpf}`);
    return response;
  }

  return {
    // createClient,
    getClientById,
    getClientByCpf,
  };
}
