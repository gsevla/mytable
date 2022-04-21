import React from 'react';
import { useTheme } from 'react-native-paper';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Icon } from '../../../components/Icon';
import { Restaurant } from '../modules/Restaurant';
import { Reservation } from '../modules/Reservation';
import { WaitingLine } from '../modules/WaitingLine';
import { Identification } from '../modules/Identification';

const AppBottomTabNavigator = createBottomTabNavigator();

function SignOutPage() {
  return null;
}

export function AppBottomTab() {
  const theme = useTheme();

  return (
    <AppBottomTabNavigator.Navigator
      screenOptions={{
        headerTitle: '',
        tabBarLabelStyle: {
          fontSize: 12,
        },
        tabBarActiveTintColor: theme.colors.accent,
        tabBarInactiveTintColor: '#aaa',
        tabBarAllowFontScaling: true,
      }}
    >
      <AppBottomTabNavigator.Screen
        name='Restaurant'
        options={{
          tabBarLabel: 'Restaurante',
          tabBarIcon: ({ color, size }) => (
            <Icon
              name='home-outline'
              color={color}
              size={size}
            />
          ),
        }}
        component={Restaurant}
      />
      <AppBottomTabNavigator.Screen
        name='Reservation'
        component={Reservation}
        options={{
          tabBarLabel: 'Reservas',
          tabBarIcon: ({ color, size }) => (
            <Icon
              name='clock-outline'
              color={color}
              size={size}
            />
          ),
        }}
      />
      <AppBottomTabNavigator.Screen
        name='WaitingLine'
        component={WaitingLine}
        options={{
          tabBarLabel: 'Fila de espera',
          tabBarIcon: ({ color, size }) => (
            <Icon
              name='human-male-female'
              color={color}
              size={size}
            />
          ),
        }}
      />
      <AppBottomTabNavigator.Screen
        name='Identification'
        component={Identification}
        options={{
          tabBarLabel: 'Identificação',
          tabBarIcon: ({ color, size }) => (
            <Icon
              name='fingerprint'
              color={color}
              size={size}
            />
          ),
        }}
      />
      <AppBottomTabNavigator.Screen
        name='SignOut'
        component={SignOutPage}
        options={{
          tabBarLabel: 'Sair',
          tabBarIcon: ({ color, size }) => (
            <Icon
              name='logout'
              color={color}
              size={size}
            />
          ),
        }}
        listeners={{
          tabPress: (e) => {
            e.preventDefault();
            // TODO
            // call signOut function (with a confirmation modal)
          },
        }}
      />
    </AppBottomTabNavigator.Navigator>
  );
}
