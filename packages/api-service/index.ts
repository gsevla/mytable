import axios from 'axios';
import { createAuth } from './src/auth';
import { createResources } from './src/resources';
import { queryClient, createQueryClientProvider } from './src/queryClient';

function createApiService() {
  const axiosInstance = axios.create({
    baseURL: 'http://192.168.15.15:3000/api',
    timeout: 15000,
  });

  const auth = createAuth(axiosInstance);

  const resources = createResources(axiosInstance);

  return {
    axiosInstance,
    queryClient,
    createQueryClientProvider,
    auth,
    resources,
  };
}

export default createApiService();
