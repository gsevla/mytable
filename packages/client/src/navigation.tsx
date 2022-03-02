import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AuthStack from './modules/Auth/navigation';
import LoadingScreen from './pages/Loading';
import { View } from 'react-native';
import { Text } from 'react-native-paper';
import { AuthModule } from './modules/Auth';

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

export default function RootStack({ loading, token }: IRootStackProps) {
  if (loading) {
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
