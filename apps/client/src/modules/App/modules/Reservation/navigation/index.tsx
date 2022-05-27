import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { routes } from '../../../../../constants/routes';
import { AppReservationReservePage } from '../pages/Reserve';
import { AppReservationTopTab } from './TopTab';

const ReservationStack = createNativeStackNavigator();

export function AppReservationStack() {
  return (
    <ReservationStack.Navigator screenOptions={{ headerShown: false }}>
      <ReservationStack.Screen
        name='reservation-list'
        component={AppReservationTopTab}
      />
      <ReservationStack.Screen
        name={routes.app.reservation.reserve.mobile}
        component={AppReservationReservePage}
      />
    </ReservationStack.Navigator>
  );
}
