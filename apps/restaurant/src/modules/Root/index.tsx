import React from 'react';
import { RootContextProvider } from './contex';
import RootStack from './navigation';

export function RootModule() {
  return (
    <RootContextProvider>
      <RootStack />
    </RootContextProvider>
  )
}
