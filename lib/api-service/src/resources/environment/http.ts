import {
  Environment,
  EnvironmentWithImage,
  CreateEnvironmentInput,
  CreateEnvironmentOutput,
  UpdateEnvironmentInput,
  UpdateEnvironmentOutput,
  CreateEnvironmentWithImagesInput,
} from '@mytable/domain';
import { UpdateEnvironmentWithImagesInput } from '@mytable/domain/entities/Environment';
import { HttpClientProtocol } from '../../protocols/HttpClient';

export function createEnvironmentEndpoints(httpClient: HttpClientProtocol) {
  const url = '/environment';
  const urlWithImage = `${url}/with-image`;

  function createEnvironment(environment: CreateEnvironmentInput) {
    return httpClient.post<CreateEnvironmentOutput>(url, environment);
  }

  function createEnvironmentWithImages(
    environment: CreateEnvironmentWithImagesInput
  ) {
    return httpClient.post<EnvironmentWithImage>(urlWithImage, environment);
  }

  function getAllEnvironment() {
    return httpClient.get<Array<Environment>>(url);
  }

  function getEnvironmentById(id: number) {
    return httpClient.get<Environment>(`${url}/${id}`);
  }

  function getAllEnvironmentWithImages() {
    return httpClient.get<Array<EnvironmentWithImage>>(urlWithImage);
  }

  function getEnvironmentByIdWithImages(id: number) {
    return httpClient.get<EnvironmentWithImage>(`${urlWithImage}/${id}`);
  }

  function updateEnvironment({ id, ...environment }: UpdateEnvironmentInput) {
    return httpClient.patch<UpdateEnvironmentOutput>(
      `${url}/${id.toString()}`,
      environment
    );
  }

  function updateEnvironmentWithImages({
    id,
    ...environment
  }: UpdateEnvironmentWithImagesInput) {
    return httpClient.patch<UpdateEnvironmentOutput>(
      `${urlWithImage}/${id.toString()}`,
      environment
    );
  }

  return {
    createEnvironment,
    createEnvironmentWithImages,
    getAllEnvironment,
    getEnvironmentById,
    getAllEnvironmentWithImages,
    getEnvironmentByIdWithImages,
    updateEnvironment,
    updateEnvironmentWithImages,
  };
}
