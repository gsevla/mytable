import React from 'react';
import RootStack from '../../navigation';
import { RootContextProvider } from './context';

function RootModule() {
  return (
    <RootContextProvider>
      <RootStack />
    </RootContextProvider>
  );
}

export { RootModule };
