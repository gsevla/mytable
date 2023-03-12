import { useCallback, useRef, useState } from 'react';
import { MutationOptions } from '../protocols/MutationOptions';
import { HttpOperationResult } from '../protocols/HttpClient';

type Fn<TData = unknown> = () => HttpOperationResult<TData>;

export function useMutation<TInput = unknown, TOutput = unknown>(
  fn: Fn<TOutput>,
  options: MutationOptions = {}
) {
  const results = useRef({});
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState<TOutput | null>(null);
  const [error, setError] = useState(null);

  const mutate = useCallback(async (input: TInput) => {
    const res = await fn(input).catch((err) => {
      setError(err);
      results.current.error = err;
      options?.onError?.(err);
      return null;
    });

    if (res !== null) {
      setData(res.data);
      results.current.data = res.data;
      options?.onSuccess?.(res.data);
    }

    setIsLoading(false);
    options?.onSettled?.(results.current.data, results.current.error);
  }, []);

  return {
    isLoading,
    data,
    error,
    mutate,
  };
}
