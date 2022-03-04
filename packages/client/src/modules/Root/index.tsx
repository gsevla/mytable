import React from 'react';
import RootStack from '../../navigation';
import { ThemeProvider } from '../Theme';
import { RootContextProvider } from './context';

interface IRootModule {
  children: React.ReactNode;
}

function RootModule() {
  return (
    <RootContextProvider>
      <RootStack />
    </RootContextProvider>
  );
}

export { RootModule };
