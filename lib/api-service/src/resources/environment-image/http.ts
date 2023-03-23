import {
  EnvironmentImage,
  CreateEnvironmentImageInput,
  CreateEnvironmentImageOutput,
  UpdateEnvironmentImageInput,
  UpdateEnvironmentImageOutput,
} from '@mytable/domain';
import { HttpClientProtocol } from '../../protocols/HttpClient';

export function createEnvironmentImageEndpoints(
  httpClient: HttpClientProtocol
) {
  const url = '/environment-image';

  function createEnvironmentImage(environment: CreateEnvironmentImageInput) {
    return httpClient.post<CreateEnvironmentImageOutput>(url, environment);
  }

  function getAllEnvironmentImage() {
    return httpClient.get<Array<EnvironmentImage>>(url);
  }

  function getEnvironmentImageById(id: number) {
    return httpClient.get<EnvironmentImage>(`${url}/${id}`);
  }

  function updateEnvironmentImage({
    id,
    ...environment
  }: UpdateEnvironmentImageInput) {
    return httpClient.patch<UpdateEnvironmentImageOutput>(
      `${url}/${id.toString()}`,
      {
        ...environment,
      }
    );
  }

  return {
    createEnvironmentImage,
    getAllEnvironmentImage,
    getEnvironmentImageById,
    updateEnvironmentImage,
  };
}
