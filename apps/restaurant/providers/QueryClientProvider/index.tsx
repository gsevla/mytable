import React, { useMemo } from 'react';
import { ApiService } from '#/services/api';

export function QueryClientProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const service = ApiService.getInstance().getService();

  const Provider = useMemo(
    () => service?.QueryClientProvider,
    [service?.QueryClientProvider]
  );

  return !Provider ? null : <Provider>{children}</Provider>;
}
