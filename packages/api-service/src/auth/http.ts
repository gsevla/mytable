import { ClientDto } from '@mytable/dtos';
import { AxiosInstance } from 'axios';

export function createAuthEndpoints(axiosInstance: AxiosInstance) {
  const url = '/auth';

  async function signInClient(cpf: string) {
    const response = await axiosInstance.post<ClientDto.IClient>(
      `${url}/sign-in`,
      {
        cpf,
      },
    );
    return response.data;
  }

  async function signUpClient(client: ClientDto.ICreateClient) {
    const response = await axiosInstance.post<ClientDto.IClient>(
      `${url}/sign-up`,
      client,
    );
    return response.data;
  }

  return {
    signInClient,
    signUpClient,
  };
}
