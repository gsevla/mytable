export type QueryOptions<TData = unknown, TError = unknown> = {
  enabled?: boolean;
  retry?: boolean;
  onSuccess?(data: TData): void;
  onError?(error: TError): void;
  onSettled?(data: TData, error: TError): void;
};
