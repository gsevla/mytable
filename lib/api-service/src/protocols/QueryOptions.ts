export type QueryOptions = {
  onSuccess?<T = unknown>(data: T): void;
  onError?<T = unknown>(error: T): void;
  onSettled?<TData = unknown, TError = unknown>(
    data: TData,
    error: TError
  ): void;
};
