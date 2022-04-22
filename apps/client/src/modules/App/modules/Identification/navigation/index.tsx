import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { AppIdentificationLooseYourTurnPage } from '../pages/LooseYourTurn';
import { AppIdentificationQrPage } from '../pages/Qr';
import { AppIdentificationWaitingPage } from '../pages/Waiting';
import { AppIdentificationYourTurnPage } from '../pages/YourTurn';
import type { IdentificationStackParamList } from './types';

const IdentificationStack =
  createNativeStackNavigator<IdentificationStackParamList>();

export function AppIdentificationStack() {
  return (
    <IdentificationStack.Navigator
      screenOptions={{ headerShown: false }}
      screenListeners={{
        beforeRemove: (e) => {
          if (e?.data?.action?.payload?.params?.forceNavigate) {
            return;
          }
          e.preventDefault();
        },
      }}
    >
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
