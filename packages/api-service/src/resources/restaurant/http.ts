import { RestaurantDto } from '@mytable/dtos';
import { AxiosInstance } from 'axios';

export function createRestaurantEndpoints(axiosInstance: AxiosInstance) {
  const url = '/restaurant';

  async function getRestaurant() {
    const response = await axiosInstance.get<RestaurantDto.IRestaurant>(url);
    return response.data;
  }

  return {
    getRestaurant,
  };
}
