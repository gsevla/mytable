import React from 'react';
import { AppContextProvider } from './context';
import AppStack from './navigation';

export default function AppModule() {
  return (
    <AppContextProvider>
      <AppStack />
    </AppContextProvider>
  );
}
