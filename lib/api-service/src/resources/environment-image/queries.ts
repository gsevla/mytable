import { useQuery } from 'react-query';
import { EnvironmentImage } from '@mytable/domain';
import { HttpOperationResult } from '../../protocols/HttpClient';
import { QueryResult } from '../../protocols/QueryClient';
import { QueryOptions } from '../../protocols/QueryOptions';
import { createEnvironmentImageEndpoints } from './http';
import { environmentImageQueryKeys } from './keys';

export function createEnvironmentImageQueries(
  environmentEndpoints: ReturnType<typeof createEnvironmentImageEndpoints>
) {
  function useEnvironmentImage(
    options: QueryOptions = {}
  ): QueryResult<Array<EnvironmentImage>> {
    const key = [environmentImageQueryKeys.environmentImage];

    const { data, isLoading } = useQuery<
      HttpOperationResult<Array<EnvironmentImage>>,
      unknown,
      Array<EnvironmentImage>
    >(key, () => environmentEndpoints.getAllEnvironmentImage(), options);

    return {
      data: data?.data,
      isLoading,
    };
  }

  function useEnvironmentImageWithId(
    id: number,
    options: QueryOptions = {}
  ): QueryResult<EnvironmentImage> {
    const key = [environmentImageQueryKeys.environmentImageById, id];

    const { data, isLoading } = useQuery<
      HttpOperationResult<EnvironmentImage>,
      unknown,
      EnvironmentImage
    >(
      key,
      ({ queryKey }) =>
        environmentEndpoints.getEnvironmentImageById(queryKey[1] as number),
      options
    );

    return {
      data: data?.data,
      isLoading,
    };
  }

  return {
    useEnvironmentImage,
    useEnvironmentImageWithId,
  };
}
