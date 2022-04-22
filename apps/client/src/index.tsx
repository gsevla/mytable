import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { navigationRef } from './services/navigation';
import { Text } from 'react-native-paper';
import { ApiService } from './services';
import { RootModule } from './modules/Root';
import { linking } from './constants/routes';

export const AppRoot = () => {
  return (
    <NavigationContainer
      linking={linking}
      fallback={<Text>Loading...</Text>}
      ref={navigationRef}
    >
      <ApiService.QueryClientProvider>
        <RootModule />
      </ApiService.QueryClientProvider>
    </NavigationContainer>
  );
};
