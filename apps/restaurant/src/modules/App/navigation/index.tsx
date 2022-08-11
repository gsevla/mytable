import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AppDashboardPage from 'pages/app/dashboard';
import AppReservationOrderPage from 'pages/app/reservation-order';
import AppWaitingLinePage from 'pages/app/waiting-line';
import AppEmployeePage from 'pages/app/employee';

const AppStackNavigator = createNativeStackNavigator();

export default function AppStack() {
    return (
      <AppStackNavigator.Navigator>
        <AppStackNavigator.Screen name='app/dashboard' component={AppDashboardPage} />
        <AppStackNavigator.Screen name='app/reservation-order' component={AppReservationOrderPage} />
        <AppStackNavigator.Screen name='app/waiting-line' component={AppWaitingLinePage} />
        <AppStackNavigator.Screen name='app/employee' component={AppEmployeePage} />
      </AppStackNavigator.Navigator>
    )
}
