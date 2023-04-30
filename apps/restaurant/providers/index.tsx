import React from 'react';
import { QueryClientProvider } from '#/providers/QueryClientProvider';
import { ServicesProvider } from '#/providers/ServicesProvider';
import { NavigationProvider } from './NavigationProvider';
import { ThemeProvider } from './ThemeProvider';

export function Providers({
  children,
}: {
  children: React.ReactNode | JSX.Element;
}) {
  return (
    <NavigationProvider>
      <ServicesProvider>
        <QueryClientProvider>
          <ThemeProvider>{children}</ThemeProvider>
        </QueryClientProvider>
      </ServicesProvider>
    </NavigationProvider>
  );
}
