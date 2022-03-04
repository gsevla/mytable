import axios from 'axios';
import { createResourcesEndpoints } from './src/resources';
import { createAuthEndpoints } from './src/auth';
import {
  queryClient,
  createQueryClientProvider,
  createQueries,
} from './queries';

function createApiService() {
  const axiosInstance = axios.create({
    baseURL: 'http://192.168.15.12:3000/api',
    timeout: 15000,
  });

  const auth = createAuthEndpoints(axiosInstance);

  const resources = createResourcesEndpoints(axiosInstance);
  const queries = createQueries(axiosInstance);

  return {
    axiosInstance,
    auth,
    resources,
    queryClient,
    createQueryClientProvider,
    queries,
  };
}

export default createApiService();
