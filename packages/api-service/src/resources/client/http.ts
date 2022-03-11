import { AxiosInstance } from 'axios';
import { ClientDto } from '@mytable/dtos';

export function createClientEndpoints(axiosInstance: AxiosInstance) {
  const url = '/client';

  async function createClient(client: ClientDto.ICreateClient) {
    const response = await axiosInstance.post<ClientDto.IClient>(url, client);
    return response.data;
  }

  async function getClientById(id: number) {
    const response = await axiosInstance.get<ClientDto.IClient>(`${url}/${id}`);
    return response.data;
  }

  async function getClientByCpf(cpf: string) {
    const response = await axiosInstance.get<ClientDto.IClient>(
      `${url}/cpf/${cpf}`,
    );
    return response.data;
  }

  return {
    createClient,
    getClientById,
    getClientByCpf,
  };
}
