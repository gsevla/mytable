import { HttpClientProtocol } from '../../protocols/HttpClient';
import { createEmployeeEndpoints } from './http';
import { createEmployeeMutations } from './mutations';
import { createEmployeeQueries } from './queries';

export function createEmployeeResource(httpClient: HttpClientProtocol) {
  const endpoints = createEmployeeEndpoints(httpClient);
  const queries = createEmployeeQueries(endpoints);
  const mutations = createEmployeeMutations(endpoints);

  return {
    endpoints,
    queries,
    mutations,
  };
}
