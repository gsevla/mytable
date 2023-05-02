import { AwaitedHttpOperationResult } from './HttpClient';

export type QueryOptions<TData = unknown, TError = unknown> = {
  enabled?: boolean;
  retry?: boolean;
  onSuccess?(data: AwaitedHttpOperationResult<TData>): void;
  onError?(error: TError): void;
  onSettled?(data: AwaitedHttpOperationResult<TData>, error: TError): void;
};
