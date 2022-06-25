import React, { useState } from 'react';
import { useTheme } from 'react-native-paper';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Icon } from '../../../components/Icon';
import { Restaurant } from '../modules/Restaurant';
import { Reservation } from '../modules/Reservation';
import { WaitingLine } from '../modules/WaitingLine';
import { Identification } from '../modules/Identification';
import { DialogWithConfirmation } from '../../../components/Dialog';

const AppBottomTabNavigator = createBottomTabNavigator();

function SignOutPage() {
  return null;
}

export function AppBottomTab() {
  const theme = useTheme();

  const [isSignOutDialogVisible, setIsSignOutDialogVisible] = useState(false);

  function openSignOutDialog() {
    setIsSignOutDialogVisible(true);
  }

  function closeSignOutDialog() {
    setIsSignOutDialogVisible(false);
  }

  function onCloseSignOutDialog() {
    closeSignOutDialog();
  }

  function onConfirmSignOutDialog() {
    closeSignOutDialog();
    // TODO
    // remove token/logout function
  }

  return (
    <>
      <AppBottomTabNavigator.Navigator
        screenOptions={{
          headerTitle: 'MyTable',
          headerStyle: {
            borderBottomWidth: 1.5,
            borderBottomColor: '#eee',
          },
          tabBarLabelStyle: {
            fontSize: 12,
          },
          tabBarActiveTintColor: theme.colors.accent,
          tabBarInactiveTintColor: '#aaa',
          tabBarAllowFontScaling: true,
        }}
      >
        <AppBottomTabNavigator.Screen
          name='restaurant'
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
          name='reservation'
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
          name='waiting-line'
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
          name='identification'
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
          name='sign-out'
          component={SignOutPage}
          options={{
            tabBarLabel: 'Sair',
            tabBarLabelStyle: { color: '#ff4d4d' },
            tabBarIcon: ({ color, size }) => (
              <Icon
                name='logout'
                color='#ff4d4d'
                size={size}
              />
            ),
          }}
          listeners={{
            tabPress: (e) => {
              e.preventDefault();
              openSignOutDialog();
            },
          }}
        />
      </AppBottomTabNavigator.Navigator>
      <DialogWithConfirmation
        visible={isSignOutDialogVisible}
        onCloseDialog={onCloseSignOutDialog}
        onConfirmDialog={onConfirmSignOutDialog}
        message='Você realmente deseja sair?'
        closeDialogText='Não'
        confirmDialogText='Sim'
      />
    </>
  );
}
