import React from 'react';
import { QueryClientProvider } from '#/providers/QueryClientProvider';
import { ServicesProvider } from '#/providers/ServicesProvider';

export function Providers({ children }: { children: JSX.Element }) {
  return (
    <ServicesProvider>
      <QueryClientProvider>{children}</QueryClientProvider>
    </ServicesProvider>
  );
}
