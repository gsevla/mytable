export type MutationOptions<TData = unknown, TError = unknown> = {
  onSuccess?(data: TData): void;
  onError?(error: TError): void;
  onSettled?(data: TData, error: TError): void;
};
