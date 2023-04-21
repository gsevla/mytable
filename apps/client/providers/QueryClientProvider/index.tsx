import React, { useMemo } from 'react';
import { useApiService } from '#hooks/api/useApiService';

export function QueryClientProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const apiService = useApiService();

  const Provider = useMemo(
    () => apiService?.QueryClientProvider,
    [apiService?.QueryClientProvider]
  );

  return !Provider ? null : <Provider>{children}</Provider>;
}
