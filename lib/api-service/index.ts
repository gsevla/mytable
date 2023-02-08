import axios from 'axios';
import { createAuth } from './src/auth';
import { createResources } from './src/resources';
import {
  queryClient,
  createQueryClientProvider,
  QueryClientProvider,
} from './src/queryClient';
import * as client from './src/swaggerClient';

export async function createApiService(baseURL: string) {
  await client;
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
    QueryClientProvider,
    auth,
    resources,
    client,
  };
}
