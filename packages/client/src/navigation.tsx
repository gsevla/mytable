import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AuthStack from './modules/Auth/navigation';

const RootStackNavigator = createNativeStackNavigator();

export default function RootStack() {
  return (
    <RootStackNavigator.Navigator>
      <RootStackNavigator.Screen
        options={{ headerShown: false }}
        name="authStack"
        component={AuthStack}
      />
    </RootStackNavigator.Navigator>
  );
}
