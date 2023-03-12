import { HttpClientProtocol } from '../../protocols/HttpClient';
import { createEmployeeEndpoints, EmployeeEndpoints } from './http';
import { createEmployeeMutations } from './mutations';
import { createEmployeeQueries } from './queries';

export function createEmployeeResource(httpClient: HttpClientProtocol) {
  console.log('httpClient', httpClient);
  const endpoints = createEmployeeEndpoints(httpClient);
  const queries = createEmployeeQueries(endpoints);
  const mutations = createEmployeeMutations(endpoints);

  return {
    endpoints,
    queries,
    mutations,
  };
}
