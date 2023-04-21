import { useMemo } from 'react';
import { ApiService } from '#services/api';

export function useApiService() {
  const service = ApiService.getInstance().getService();

  return useMemo(() => service, [service]);
}
