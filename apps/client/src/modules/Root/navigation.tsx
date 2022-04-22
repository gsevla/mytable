import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoadingScreen from '../../pages/Loading';
import { View } from 'react-native';
import { Text } from 'react-native-paper';
import { AuthModule } from '../Auth';
import { useContextSelector } from 'use-context-selector';
import { RootContext } from './context';
import { AppBottomTab } from '../App/navigation';

const RootStackNavigator = createNativeStackNavigator();

function App() {
  return (
    <View>
      <Text>this is mytable app</Text>
    </View>
  );
}

export default function RootStack() {
  const loading = useContextSelector(RootContext, (values) => values.loading);
  const loaded = useContextSelector(RootContext, (values) => values.loaded);
  const client = useContextSelector(RootContext, (values) => values.client);
  const token = useContextSelector(RootContext, (values) => values.token);

  if (loading || !loaded) {
    return <LoadingScreen />;
  }

  return (
    <RootStackNavigator.Navigator>
      {client && token ? (
        <RootStackNavigator.Screen
          name='app'
          component={AppBottomTab}
          options={{
            headerShown: false,
          }}
        />
      ) : (
        <RootStackNavigator.Screen
          options={{ headerShown: false }}
          name='auth'
          component={AuthModule}
        />
      )}
    </RootStackNavigator.Navigator>
  );
}
