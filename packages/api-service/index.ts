import axios from 'axios';
import { createResourcesEndpoints } from './src/resources';
import { createAuthEndpoints } from './src/auth';

function createApiService() {
  const axiosInstance = axios.create({
    baseURL: 'http://192.168.15.15:3000/api',
    timeout: 15000,
  });

  const resources = createResourcesEndpoints(axiosInstance);
  const auth = createAuthEndpoints(axiosInstance);

  return {
    axiosInstance,
    auth,
    resources,
  };
}

export default createApiService();
