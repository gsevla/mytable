import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AskForCpfPage } from './pages/AskForCpf';
import { AuthorizationCodePage } from './pages/AuthorizationCode';
import { IdentificationPage } from './pages/Identification';
import { IdentificationDonePage } from './pages/IdentificationDone';
import { ForgotPasswordPage } from './pages/ForgotPassword';
import { useContextSelector } from 'use-context-selector';
import { RootContext } from '../Root/context';

const AuthStackNavigator = createNativeStackNavigator();

export default function AuthStack() {
  const client = useContextSelector(RootContext, (values) => values.client);

  return (
    <AuthStackNavigator.Navigator screenOptions={{ headerShown: false }}>
      {!client ? (
        <AuthStackNavigator.Group>
          <AuthStackNavigator.Screen
            name="ask-for-cpf"
            component={AskForCpfPage}
          />
          <AuthStackNavigator.Screen
            name="identification"
            component={IdentificationPage}
          />
        </AuthStackNavigator.Group>
      ) : (
        <AuthStackNavigator.Group>
          <AuthStackNavigator.Screen
            name="identification-done"
            component={IdentificationDonePage}
          />
          <AuthStackNavigator.Screen
            name="forgot-password"
            component={ForgotPasswordPage}
          />
          <AuthStackNavigator.Screen
            name="authorization"
            component={AuthorizationCodePage}
          />
        </AuthStackNavigator.Group>
      )}
    </AuthStackNavigator.Navigator>
  );
}
