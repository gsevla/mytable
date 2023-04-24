import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { routes } from '../../../../../constants/routes';
import { AppReservationReservePage } from '../pages/Reserve';
import { AppReservationTopTab } from './TopTab';
import { useRestaurant } from '#hooks/api/restaurant/useRestaurant';

const ReservationStack = createNativeStackNavigator();

export function AppReservationStack() {
  const { data: restaurant } = useRestaurant();

  return (
    <ReservationStack.Navigator
      screenOptions={{
        headerShown: true,
        headerTitle: restaurant?.name ?? 'MyTable',
        headerStyle: {
          borderBottomWidth: 1.5,
          borderBottomColor: '#eee',
        },
      }}
    >
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
