import { Client } from '@mytable/domain';
import { HttpClientProtocol } from '../../protocols/HttpClient';

export function createClientEndpoints(httpClient: HttpClientProtocol) {
  const url = '/client';

  async function getClientById(id: number) {
    const response = await httpClient.get<Client>(`${url}/${id}`);
    return response;
  }

  async function getClientByCpf(cpf: string) {
    const response = await httpClient.get<Client>(`${url}/cpf/${cpf}`);
    return response;
  }

  return {
    getClientById,
    getClientByCpf,
  };
}
