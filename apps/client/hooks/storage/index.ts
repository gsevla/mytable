import { useMemo } from 'react';
import { StorageService } from '#services/storage';

export function useStorageService() {
  const service = StorageService.getInstance().getService();

  return useMemo(() => service, [service]);
}
