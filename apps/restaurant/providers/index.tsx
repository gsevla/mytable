import React from 'react';
import { QueryClientProvider } from '#/providers/QueryClientProvider';
import { ServicesProvider } from '#/providers/ServicesProvider';
import { NavigationProvider } from './NavigationProvider';
import { ThemeProvider } from './ThemeProvider';
import { SnackbarProvider } from './SnackbarProvider';

export function Providers({
  children,
}: {
  children: React.ReactNode | JSX.Element;
}) {
  return (
    <NavigationProvider>
      <ServicesProvider>
        <QueryClientProvider>
          <ThemeProvider>
            <SnackbarProvider>{children}</SnackbarProvider>
          </ThemeProvider>
        </QueryClientProvider>
      </ServicesProvider>
    </NavigationProvider>
  );
}
