import { AxiosInstance } from 'axios';

export function createClientEndpoints(axiosInstance: AxiosInstance) {
  const url = '/client';

  async function createClient(client: any) {
    const response = await axiosInstance.post(url, client).catch((error) => {
      console.log('error on createClient', error);
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
      responseObject['message'] = 'Cliente criado com sucesso!';
    } else {
      responseObject['error'] = 'Erro ao tentar criar o cliente!';
    }

    return responseObject;
  }

  async function getClientById(id: number) {
    const response = await axiosInstance.get(`${url}/${id}`).catch((error) => {
      console.log('error on createClient', error);
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
      responseObject['message'] = 'Cliente recuperado com sucesso!';
    } else {
      responseObject['error'] = 'Erro ao tentar recuperar o cliente!';
    }

    return responseObject;
  }

  async function getClientByCpf(cpf: string) {
    const response = await axiosInstance.get(`${url}/cpf/${cpf}`);
    // .catch((error) => {
    //   console.log('error on getClientByCpf', error);
    // });

    // const responseObject = {
    //   message: '',
    //   error: '',
    // } as {
    //   message: string;
    //   error: string;
    //   data?: any;
    //   status: number;
    // };

    return response.data;

    // if (response) {
    //   responseObject['data'] = response.data;
    //   responseObject['status'] = response.status;
    //   responseObject['message'] = 'Cliente recuperado com sucesso!';
    // } else {
    //   responseObject['error'] = 'Erro ao tentar recuperar o cliente!';
    // }

    // return responseObject;
  }

  return {
    createClient,
    getClientById,
    getClientByCpf,
  };
}
