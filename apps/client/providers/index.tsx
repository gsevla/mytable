import React from 'react';
import { QueryClientProvider } from '#providers/QueryClientProvider';
import { ServicesProvider } from '#providers/ServicesProvider';
import { NavigationProvider } from './NavigationProvider';
import { SnackbarProvider } from './SnackbarProvider';

export function Providers({ children }: { children: JSX.Element }) {
  return (
    <NavigationProvider>
      <ServicesProvider>
        <QueryClientProvider>
          <SnackbarProvider>{children}</SnackbarProvider>
        </QueryClientProvider>
      </ServicesProvider>
    </NavigationProvider>
  );
}
