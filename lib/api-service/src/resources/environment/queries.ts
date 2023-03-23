import { useQuery } from 'react-query';
import { Environment, EnvironmentWithImage } from '@mytable/domain';
import { HttpOperationResult } from '../../protocols/HttpClient';
import { QueryResult } from '../../protocols/QueryClient';
import { QueryOptions } from '../../protocols/QueryOptions';
import { createEnvironmentEndpoints } from './http';
import { environmentQueryKeys } from './keys';

export function createEnvironmentQueries(
  environmentEndpoints: ReturnType<typeof createEnvironmentEndpoints>
) {
  function useEnvironment(
    options: QueryOptions = {}
  ): QueryResult<Array<Environment>> {
    const key = [environmentQueryKeys.environment];

    const { data, isLoading } = useQuery<
      HttpOperationResult<Array<Environment>>,
      unknown,
      Array<Environment>
    >(key, () => environmentEndpoints.getAllEnvironment(), options);

    return {
      data: data?.data,
      isLoading,
    };
  }

  function useEnvironmentWithId(
    id: number,
    options: QueryOptions = {}
  ): QueryResult<Environment> {
    const key = [environmentQueryKeys.environment, id];

    const { data, isLoading } = useQuery<
      HttpOperationResult<Environment>,
      unknown,
      Environment
    >(
      key,
      ({ queryKey }) =>
        environmentEndpoints.getEnvironmentById(queryKey[1] as number),
      options
    );

    return {
      data: data?.data,
      isLoading,
    };
  }

  function useEnvironmentWithImages(
    options: QueryOptions = {}
  ): QueryResult<Array<EnvironmentWithImage>> {
    const key = [environmentQueryKeys.environmentWithImage];

    const { data, isLoading } = useQuery<
      HttpOperationResult<Array<EnvironmentWithImage>>,
      unknown,
      Array<Environment>
    >(key, () => environmentEndpoints.getAllEnvironmentWithImages(), options);

    return {
      data: data?.data,
      isLoading,
    };
  }

  function useEnvironmentWithIdWithImages(
    id: number,
    options: QueryOptions = {}
  ): QueryResult<EnvironmentWithImage> {
    const key = [environmentQueryKeys.environmentWithImageById, id];

    const { data, isLoading } = useQuery<
      HttpOperationResult<EnvironmentWithImage>,
      unknown,
      EnvironmentWithImage
    >(
      key,
      ({ queryKey }) =>
        environmentEndpoints.getEnvironmentByIdWithImages(
          queryKey[1] as number
        ),
      options
    );

    return {
      data: data?.data,
      isLoading,
    };
  }

  return {
    useEnvironment,
    useEnvironmentWithId,
    useEnvironmentWithImages,
    useEnvironmentWithIdWithImages,
  };
}
