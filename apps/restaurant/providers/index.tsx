import React from 'react';
import { QueryClientProvider } from './QueryClientProvider';
import { ServicesProvider } from './ServicesProvider';

export function Providers({ children }: { children: JSX.Element }) {
  return (
    <ServicesProvider>
      <QueryClientProvider>{children}</QueryClientProvider>
    </ServicesProvider>
  );
}
