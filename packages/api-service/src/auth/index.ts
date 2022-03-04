import { AxiosInstance } from 'axios';

export function createAuthEndpoints(axiosInstance: AxiosInstance) {
  const url = '/auth';

  async function signInClient(client: any) {
    const response = await axiosInstance
      .post(`${url}/sign-in`, client)
      .catch((error) => {
        console.log('error on clientSignIn', error);
      });

    const responseObject = {
      message: '',
      error: '',
    } as {
      message: string;
      error: string;
      data?: any;
      status: number;
    };

    if (response) {
      responseObject['data'] = response.data;
      responseObject['status'] = response.status;
      responseObject['message'] = 'Cliente autenticado com sucesso!';
    } else {
      responseObject['error'] = 'Erro ao tentar autenticar o cliente!';
    }

    return responseObject;
  }

  return {
    signInClient,
  };
}
