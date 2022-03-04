import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoadingScreen from './pages/Loading';
import { View } from 'react-native';
import { Text } from 'react-native-paper';
import { AuthModule } from './modules/Auth';
import { useContextSelector } from 'use-context-selector';
import { RootContext } from './modules/Root/context';

const RootStackNavigator = createNativeStackNavigator();

function App() {
  return (
    <View>
      <Text>this is mytable app</Text>
    </View>
  );
}

interface IRootStackProps {
  loading: boolean;
  token: string;
}

export default function RootStack() {
  const loaded = useContextSelector(RootContext, (values) => values.loaded);

  const token = '';

  if (!loaded) {
    return <LoadingScreen />;
  }

  return (
    <RootStackNavigator.Navigator>
      {token ? (
        <RootStackNavigator.Screen name="app" component={App} />
      ) : (
        <RootStackNavigator.Screen
          options={{ headerShown: false }}
          name="auth"
          component={AuthModule}
        />
      )}
    </RootStackNavigator.Navigator>
  );
}
