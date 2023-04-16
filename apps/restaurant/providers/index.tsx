import React from 'react';
import { QueryClientProvider } from '#/providers/QueryClientProvider';
import { ServicesProvider } from '#/providers/ServicesProvider';
import { AuthGuardProvider } from './AuthGuardProvider';

export function Providers({ children }: { children: JSX.Element }) {
  return (
    <ServicesProvider>
      <QueryClientProvider>
        <AuthGuardProvider>{children}</AuthGuardProvider>
      </QueryClientProvider>
    </ServicesProvider>
  );
}
