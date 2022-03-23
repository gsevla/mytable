import axios from 'axios';
import { createAuth } from './src/auth';
import { createResources } from './src/resources';
import { queryClient, createQueryClientProvider } from './src/queryClient';

function createApiService() {
  const axiosInstance = axios.create({
    baseURL: `${process.env.SERVER_HOST}/api`,
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
