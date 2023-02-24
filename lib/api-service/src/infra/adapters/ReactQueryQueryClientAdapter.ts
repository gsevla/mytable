import { QueryClient } from 'react-query';
import {
  MutateFn,
  MutationResult,
  QueryClientProtocol,
  QueryFn,
  QueryKey,
  QueryResult,
} from '../../protocols/QueryClient';

export class ReactQueryQueryClientAdapter implements QueryClientProtocol {
  private client: QueryClient;

  constructor() {
    this.client = new QueryClient();
  }

  query<Result = unknown>(
    queryKey: QueryKey,
    queryFn: QueryFn<Result>
  ): QueryResult<Result> {
    //
  }

  mutate<Result = unknown, Input = unknown>(
    mutateFn: MutateFn<Result>
  ): MutationResult<Result, Input> {
    //
  }
}
