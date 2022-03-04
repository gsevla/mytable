import { AxiosError, AxiosInstance } from 'axios';

export function createRestaurantEndpoints(axiosInstance: AxiosInstance) {
  const url = '/restaurant';

  async function getRestaurant() {
    const response = await axiosInstance.get(url).catch((error: AxiosError) => {
      console.log('error on createClient', error.request);
    });

    if (response) {
      return response.data;
    }

    // const responseObject = {
    //   message: '',
    //   error: '',
    // } as {
    //   message: string;
    //   error: string;
    //   data?: any;
    //   status: number;
    // };

    // if (response) {
    //   responseObject['data'] = response.data;
    //   responseObject['status'] = response.status;
    //   responseObject['message'] = 'Restaurante recuperado com sucesso!';
    // } else {
    //   responseObject['error'] = 'Erro ao tentar recuperar o restaurante';
    // }
    return null;
  }

  return {
    getRestaurant,
  };
}
