import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AskForCpfPage } from './pages/AskForCpf';
import { AuthorizationCodePage } from './pages/AuthorizationCode';
import { IdentificationPage } from './pages/Identification';
import { IdentificationDonePage } from './pages/IdentificationDone';
import { ForgotPasswordPage } from './pages/ForgotPassword';
import { AuthorizationPage } from './pages/Authorization';

const AuthStackNavigator = createNativeStackNavigator();

export default function AuthStack() {
  return (
    <AuthStackNavigator.Navigator screenOptions={{ headerShown: false }}>
      <AuthStackNavigator.Screen name="ask-for-cpf" component={AskForCpfPage} />
      <AuthStackNavigator.Screen
        name="identification"
        component={IdentificationPage}
      />
      <AuthStackNavigator.Screen
        name="forgot-password"
        component={ForgotPasswordPage}
      />
      <AuthStackNavigator.Screen
        name="identification-done"
        component={IdentificationDonePage}
      />
      <AuthStackNavigator.Screen
        name="authorization"
        component={AuthorizationCodePage}
      />
    </AuthStackNavigator.Navigator>
  );
}
