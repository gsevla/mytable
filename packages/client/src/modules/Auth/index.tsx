import React from 'react';
import { AuthContextProvider } from './context';
import AuthStack from './navigation';

export function AuthModule() {
  return (
    <AuthContextProvider>
      <AuthStack />
    </AuthContextProvider>
  );
}
