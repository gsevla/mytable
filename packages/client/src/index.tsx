import { NavigationContainer } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { navigationRef } from './services/navigation';
import { AuthContextProvider } from './modules/Auth/context';
import AuthStack from './modules/Auth/navigation';
import RootStack from './navigation';
import { ThemeProvider } from './modules/Theme';
import * as Linking from 'expo-linking';
import { Text, ActivityIndicator, Title } from 'react-native-paper';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AuthorizationPage } from './modules/Auth/pages/Authorization';
import { AuthModule } from './modules/Auth';
// import apiService from '@mytable/api-service';
import { ApiService, StorageService } from './services';
import { IUser } from '../_dos/user';

const prefix = Linking.createURL('/');
const config = {
  screens: {
    auth: {
      screens: {
        'ask-for-cpf': 'auth/ask-for-cpf',
        identification: 'auth/identification',
        'forgot-password': 'auth/forgot-password',
        'identification-done': 'auth/identification-done',
        code: 'auth/code',
        authorization: 'auth/authorization',
      },
    },
    home: 'home',
  },
};

const StackTest = createNativeStackNavigator();

const HomeScreen = () => {
  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Text>home</Text>
    </View>
  );
};

const LoadingScreen = () => {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <ActivityIndicator size="large" />
      <Title>Carregando</Title>
    </View>
  );
};

export const AppRoot = () => {
  const linking = {
    prefixes: [prefix],
    config,
  };

  const [loading, setLoading] = useState(true);
  const [restaurant, setRestaurant] = useState();

  useEffect(() => {
    ApiService.resources.restaurant
      .getRestaurant()
      .then((response) => {
        if (response.data) {
          setRestaurant(response.data);
          StorageService.setData({
            key: StorageService.keys.restaurant,
            value: JSON.stringify(response.data),
          }).catch((error) => {
            console.log('error on get restaurant from storage');
          });
        }
      })
      .catch((error) => {
        console.log('error on getRestaurant', error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  // useEffect(() => {

  //   StorageService.getData({key: StorageService.keys.user}).then(user => {
  //     if(user) {
  //       const _user = JSON.parse(user) as IUser
  //       ApiService.resources.client.getClientByCpf(_user.cpf).then((client) => {

  //       }).catch(_error => {
  //         //
  //       });
  //     }
  //   }).catch(error => {
  //     //
  //   })

  // }, []);

  return (
    <NavigationContainer
      linking={linking}
      fallback={<Text>Loading...</Text>}
      ref={navigationRef}
    >
      <ThemeProvider
        primaryColor={restaurant?.primaryColor}
        accentColor={restaurant?.accentColor}
      >
        {loading ? (
          <LoadingScreen />
        ) : (
          <StackTest.Navigator>
            <StackTest.Screen
              name="auth"
              component={AuthModule}
              options={{ headerShown: false }}
            />
            <StackTest.Screen name="home" component={HomeScreen} />
          </StackTest.Navigator>
        )}
      </ThemeProvider>
    </NavigationContainer>
  );
};
