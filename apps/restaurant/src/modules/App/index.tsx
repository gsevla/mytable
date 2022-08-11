import React from 'react';
import { Text } from 'react-native-paper';
import { AppContextProvider } from './context';
import AppStack from './navigation';

export default function AppModule() {
  return (
    <AppContextProvider>
      <AppStack />
    </AppContextProvider>
  );
}
