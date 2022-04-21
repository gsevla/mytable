import React from 'react';
import { View } from 'react-native';
import { Text, useTheme } from 'react-native-paper';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Icon } from '../../../components/Icon';

const AppBottomTabNavigator = createBottomTabNavigator();

function Restaurant() {
  return (
    <View>
      <Text>this is restaurant</Text>
    </View>
  );
}

function Reservation() {
  return (
    <View>
      <Text>this is reservation</Text>
    </View>
  );
}

function WaitingLine() {
  return (
    <View>
      <Text>this is waiting line</Text>
    </View>
  );
}

function Identification() {
  return (
    <View>
      <Text>this is identification</Text>
    </View>
  );
}

function SignOut() {
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
        component={Reservation}
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
        component={SignOut}
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
      />
    </AppBottomTabNavigator.Navigator>
  );
}
