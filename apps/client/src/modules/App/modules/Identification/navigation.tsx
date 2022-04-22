import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { AppIdentificationLooseYourTurnPage } from './pages/LooseYourTurn';
import { AppIdentificationQrPage } from './pages/Qr';
import { AppIdentificationWaitingPage } from './pages/Waiting';
import { AppIdentificationYourTurnPage } from './pages/YourTurn';

const IdentificationStack = createNativeStackNavigator();

export function AppIdentificationStack() {
  return (
    <IdentificationStack.Navigator screenOptions={{ headerShown: false }}>
      <IdentificationStack.Screen
        name='Qr'
        component={AppIdentificationQrPage}
      />
      <IdentificationStack.Screen
        name='Waiting'
        component={AppIdentificationWaitingPage}
      />
      <IdentificationStack.Screen
        name='YourTurn'
        component={AppIdentificationYourTurnPage}
      />
      <IdentificationStack.Screen
        name='LooseYourTurn'
        component={AppIdentificationLooseYourTurnPage}
      />
    </IdentificationStack.Navigator>
  );
}
