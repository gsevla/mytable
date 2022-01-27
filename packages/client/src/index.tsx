import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { View } from 'react-native';
import { navigationRef } from './services/navigation';
import { AuthContextProvider } from './modules/Auth/context';
import AuthStack from './modules/Auth/navigation';
import RootStack from './navigation';

export const AppRoot = () => {
  return (
    <NavigationContainer ref={navigationRef}>
      <AuthContextProvider>
        <RootStack />
      </AuthContextProvider>
    </NavigationContainer>
  );
};
