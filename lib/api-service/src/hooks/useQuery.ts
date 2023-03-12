import { useEffect, useRef, useState } from 'react';
import { MutationOptions } from '../protocols/MutationOptions';
import { HttpOperationResult } from '../protocols/HttpClient';

type Fn<TData = unknown> = () => HttpOperationResult<TData>;

type UseQueryReturnType<TData = unknown> = {
  isLoading: boolean;
  data: TData | null;
  error: unknown;
};

export function useQuery<TData = unknown>(
  fn: Fn<TData>,
  options: MutationOptions<TData> = {}
): UseQueryReturnType<TData> {
  const results = useRef({});
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState<TData | null>(null);
  const [error, setError] = useState(null);

  async function innerFn() {
    const res = await fn().catch((err) => {
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
  }

  useEffect(() => {
    innerFn();
  }, []);

  return {
    isLoading,
    data,
    error,
  };
}
