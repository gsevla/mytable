import { HttpClientProtocol } from '../../protocols/HttpClient';
import { createWorkingDayEndpoints } from './http';
import { createWorkingDayMutations } from './mutations';

export function createWorkingDayResource(httpClient: HttpClientProtocol) {
  const endpoints = createWorkingDayEndpoints(httpClient);
  const mutations = createWorkingDayMutations(endpoints);

  return {
    endpoints,
    mutations,
  };
}
