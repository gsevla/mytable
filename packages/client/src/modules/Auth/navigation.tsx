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
        name="identification"
        component={IdentificationPage}
      />
      <AuthStackNavigator.Screen
        name="ForgotPasswordPage"
        component={ForgotPasswordPage}
      />
      <AuthStackNavigator.Screen
        name="IdentificationDonePage"
        component={IdentificationDonePage}
      />
      <AuthStackNavigator.Screen
        name="AuthorizationCodePage"
        component={AuthorizationCodePage}
      />
    </AuthStackNavigator.Navigator>
  );
}
