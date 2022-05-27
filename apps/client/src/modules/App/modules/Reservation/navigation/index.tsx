import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { routes } from '../../../../../constants/routes';
import { AppReservationListPage } from '../pages/List';
import { AppReservationReservePage } from '../pages/Reserve';

const ReservationStack = createNativeStackNavigator();

export function AppReservationStack() {
  return (
    <ReservationStack.Navigator screenOptions={{ headerShown: false }}>
      <ReservationStack.Screen
        name={routes.app.reservation.list.mobile}
        component={AppReservationListPage}
      />
      <ReservationStack.Screen
        name={routes.app.reservation.reserve.mobile}
        component={AppReservationReservePage}
      />
    </ReservationStack.Navigator>
  );
}
