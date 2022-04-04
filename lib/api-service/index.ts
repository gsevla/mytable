import axios from 'axios';
import { createAuth } from './src/auth';
import { createResources } from './src/resources';
import { queryClient, createQueryClientProvider } from './src/queryClient';

export function createApiService(baseURL: string) {
  const axiosInstance = axios.create({
    baseURL,
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
