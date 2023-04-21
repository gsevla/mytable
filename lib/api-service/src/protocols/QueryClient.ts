import { AwaitedHttpOperationResult } from './HttpClient';

// export type MutationOptions = {
//   onSuccess?<T = unknown>(data: T): void;
//   onError?<T = unknown>(error: T): void;
//   onSettled?<TData = unknown, TError = unknown>(
//     data: TData,
//     error: TError
//   ): void;
// };

export type MutationResult<Result = unknown, Input = unknown> = {
  data?: Result;
  isLoading: boolean;
  mutate: (args: Input) => void;
};

// export type QueryOptions = {
//   onSuccess?<T = unknown>(data: T): void;
//   onError?<T = unknown>(error: T): void;
//   onSettled?<TData = unknown, TError = unknown>(
//     data: TData,
//     error: TError
//   ): void;
// };

export type QueryResult<Result = unknown> = {
  data?: Result;
  isLoading: boolean;
  isRefetching: boolean;
  refetch(): void;
};

export type QueryKey = Array<unknown>;

export type QueryFn<T = unknown> = ({ queryKey }: { queryKey: QueryKey }) => T;

export type MutateFn<T = unknown> = ({ queryKey }: { queryKey: QueryKey }) => T;

export interface QueryClientProtocol {
  query<Result = unknown>(
    queryKey: QueryKey,
    queryFn: QueryFn<Result>
  ): QueryResult<Result>;

  mutate<Result = unknown, Input = unknown>(
    mutateFn: MutateFn<Result>
  ): MutationResult<Result, Input>;
}
