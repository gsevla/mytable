import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AskForCpfPage } from './pages/AskForCpf';
import { AuthorizationCodePage } from './pages/AuthorizationCode';
import { IdentificationPage } from './pages/Identification';
import { IdentificationDonePage } from './pages/IdentificationDone';
import { ForgotPasswordPage } from './pages/ForgotPassword';

const AuthStackNavigator = createNativeStackNavigator();

export default function AuthStack() {
  return (
    <AuthStackNavigator.Navigator screenOptions={{ headerShown: false }}>
      <AuthStackNavigator.Screen name="auth" component={AskForCpfPage} />
      <AuthStackNavigator.Screen
        name="auth/identification"
        component={IdentificationPage}
      />
      <AuthStackNavigator.Screen
        name="auth/forgot-password"
        component={ForgotPasswordPage}
      />
      <AuthStackNavigator.Screen
        name="auth/identification/done"
        component={IdentificationDonePage}
      />
      <AuthStackNavigator.Screen
        name="auth/code"
        component={AuthorizationCodePage}
      />
    </AuthStackNavigator.Navigator>
  );
}
