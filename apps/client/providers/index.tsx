import React from 'react';
import { QueryClientProvider } from '#providers/QueryClientProvider';
import { ServicesProvider } from '#providers/ServicesProvider';
import { NavigationProvider } from './NavigationProvider';

export function Providers({ children }: { children: JSX.Element }) {
  return (
    <NavigationProvider>
      <ServicesProvider>
        <QueryClientProvider>{children}</QueryClientProvider>
      </ServicesProvider>
    </NavigationProvider>
  );
}
