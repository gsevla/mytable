import {
  Environment,
  EnvironmentWithImage,
  CreateEnvironmentInput,
  CreateEnvironmentOutput,
  UpdateEnvironmentInput,
  UpdateEnvironmentOutput,
} from '@mytable/domain';
import { HttpClientProtocol } from '../../protocols/HttpClient';

export function createEnvironmentEndpoints(httpClient: HttpClientProtocol) {
  const url = '/environment';

  function createEnvironment(environment: CreateEnvironmentInput) {
    return httpClient.post<CreateEnvironmentOutput>(url, environment);
  }

  function getAllEnvironment() {
    return httpClient.get<Array<Environment>>(url);
  }

  function getEnvironmentById(id: number) {
    return httpClient.get<Environment>(`${url}/${id}`);
  }

  function getAllEnvironmentWithImages() {
    return httpClient.get<Array<EnvironmentWithImage>>(`${url}/with-image`);
  }

  function getEnvironmentByIdWithImages(id: number) {
    return httpClient.get<EnvironmentWithImage>(`${url}/with-image/${id}`);
  }

  function updateEnvironment({ id, ...environment }: UpdateEnvironmentInput) {
    return httpClient.patch<UpdateEnvironmentOutput>(
      `${url}/${id.toString()}`,
      {
        ...environment,
      }
    );
  }

  return {
    createEnvironment,
    getAllEnvironment,
    getEnvironmentById,
    getAllEnvironmentWithImages,
    getEnvironmentByIdWithImages,
    updateEnvironment,
  };
}
