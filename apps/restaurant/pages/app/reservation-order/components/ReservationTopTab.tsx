import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import React from 'react';
import { useTheme } from 'react-native-paper';
import { ActiveReservationTab } from './ActiveReservationTab';
import { ReservationHistoryTab } from './ReservationHistoryTab';
import { routes } from '~/constants/routes';

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
        name={routes.app['reservation-order'].active.web}
        component={ActiveReservationTab}
        options={{
          tabBarLabel: 'Em andamento',
        }}
      />
      <ReservationTopTab.Screen
        name={routes.app['reservation-order'].history.web}
        component={ReservationHistoryTab}
        options={{
          tabBarLabel: 'Histórico',
        }}
      />
    </ReservationTopTab.Navigator>
  );
}
