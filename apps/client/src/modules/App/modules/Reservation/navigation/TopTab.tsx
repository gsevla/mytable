import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { AppReservationListActivePage } from '../pages/ListActive';
import { AppReservationListHistoryPage } from '../pages/ListHistory';
import { routes } from '../../../../../constants/routes';
import { useTheme } from 'react-native-paper';

const ReservationTopTab = createMaterialTopTabNavigator();

export function AppReservationTopTab() {
  const theme = useTheme();

  return (
    <ReservationTopTab.Navigator
      screenOptions={{
        tabBarLabelStyle: {
          fontSize: 12,
        },
        tabBarActiveTintColor: theme.colors.accent,
        tabBarInactiveTintColor: '#aaa',
        tabBarAllowFontScaling: true,
        tabBarIndicatorStyle: {
          backgroundColor: theme.colors.accent,
        },
      }}
    >
      <ReservationTopTab.Screen
        name={routes.app.reservation.list.active.mobile}
        component={AppReservationListActivePage}
        options={{
          tabBarLabel: 'Em andamento',
        }}
      />
      <ReservationTopTab.Screen
        name={routes.app.reservation.list.history.mobile}
        component={AppReservationListHistoryPage}
        options={{
          tabBarLabel: 'Histórico',
        }}
      />
    </ReservationTopTab.Navigator>
  );
}
