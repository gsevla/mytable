import { HttpClientProtocol } from '../../protocols/HttpClient';
import { EmployeeEndpoints } from './http';
import { createEmployeeMutations } from './mutations';
import { createEmployeeQueries } from './queries';

export function createEmployeeResource(httpClient: HttpClientProtocol) {
  const endpoints = new EmployeeEndpoints(httpClient);
  const queries = createEmployeeQueries(endpoints);
  const mutations = createEmployeeMutations(endpoints);

  return {
    endpoints,
    queries,
    mutations,
  };
}
