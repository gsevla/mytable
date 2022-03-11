import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { navigationRef } from './services/navigation';
import * as Linking from 'expo-linking';
import { Text } from 'react-native-paper';
import { ApiService } from './services';
import { RootModule } from './modules/Root';

const prefix = Linking.createURL('/');
const config = {
  screens: {
    auth: {
      screens: {
        'ask-for-cpf': 'auth/ask-for-cpf',
        identification: 'auth/identification',
        'forgot-password': 'auth/forgot-password',
        'identification-done': 'auth/identification-done',
        code: 'auth/code',
        authorization: 'auth/authorization',
      },
    },
    app: 'app',
  },
};

export const AppRoot = () => {
  const linking = {
    prefixes: [prefix],
    config,
  };

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
