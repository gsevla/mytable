import React, { useEffect } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useContextSelector } from 'use-context-selector';
import { AuthModule } from '../Auth';
import LoadingScreen from '../../pages/Loading';
import { RootContext } from './context';
import { AppBottomTab } from '../App/navigation';
import { useApiService } from '#hooks/api/useApiService';

const RootStackNavigator = createNativeStackNavigator();

export default function RootStack() {
  const apiService = useApiService();

  const loading = useContextSelector(RootContext, (values) => values.loading);
  const loaded = useContextSelector(RootContext, (values) => values.loaded);
  const client = useContextSelector(RootContext, (values) => values.client);
  const token = useContextSelector(RootContext, (values) => values.token);

  useEffect(() => {
    if (token) {
      apiService.httpClient.setHeader('Authorization', `Bearer ${token}`);
    }
  }, [token]);

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
