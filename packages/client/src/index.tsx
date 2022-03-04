import { NavigationContainer } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { navigationRef } from './services/navigation';
import RootStack from './navigation';
import { ThemeProvider } from './modules/Theme';
import * as Linking from 'expo-linking';
import { Text } from 'react-native-paper';
import { ApiService, StorageService } from './services';
import { IUser } from '../_dos/user';
import { RootModule } from './modules/Root';

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
    app: 'app',
  },
};

export const AppRoot = () => {
  const linking = {
    prefixes: [prefix],
    config,
  };

  const [loading, setLoading] = useState(true);
  const [restaurant, setRestaurant] = useState();
  const [user, setUser] = useState();
  const [token, setToken] = useState('');

  // always update restaurant
  // async function loadAndPersistRestaurant() {
  //   const response = await ApiService.resources.restaurant
  //     .getRestaurant()
  //     .catch((e1) => {
  //       console.log('e1 on loadAndPersistRestaurant (load part)', e1);
  //       throw e1;
  //     });

  //   if (response.data) {
  //     setRestaurant(response.data);
  //     await StorageService.setData({
  //       key: 'restaurant',
  //       value: JSON.stringify(response.data),
  //     }).catch((e2) => {
  //       console.log('error on loadAndPersistRestaurant (persist part)', e2);
  //       throw e2;
  //     });
  //   }
  // }

  // // always update user if it exists on db
  // async function loadAndPersistUser() {
  //   let _user = await StorageService.getData({ key: 'user' }).catch((e1) => {
  //     console.log('e1 on loadAndPersistUser (load part 1)', e1);
  //     throw e1;
  //   });

  //   if (_user) {
  //     const parsedUser = JSON.parse(_user) as IUser;
  //     const response = await ApiService.resources.client
  //       .getClientByCpf(parsedUser?.cpf)
  //       .catch((e2) => {
  //         console.log('e2 on loadAndPersistUser (load part 2)', e2);
  //         throw e2;
  //       });

  //     if (response.data) {
  //       setUser(response.data);
  //       await StorageService.setData({
  //         key: 'user',
  //         value: JSON.stringify(response.data),
  //       }).catch((e3) => {
  //         console.log('error on loadAndPersistUser (persist part)', e3);
  //         throw e3;
  //       });
  //     }
  //   }
  // }

  // async function loadToken() {
  //   const _token = await StorageService.getData({ key: 'token' }).catch(
  //     (error) => {
  //       console.log('error on load token', error);
  //     },
  //   );

  //   if (_token) {
  //     setToken(_token);
  //   }
  // }

  // async function loadAll() {
  //   Promise.all([loadAndPersistRestaurant(), loadAndPersistUser(), loadToken()])
  //     .then((response) => {
  //       setLoading(false);
  //     })
  //     .catch((error) => {
  //       console.log('error on loadAll', error);
  //       throw error;
  //     });
  // }

  // useEffect(() => {
  //   loadAll();
  // }, []);

  return (
    <NavigationContainer
      linking={linking}
      fallback={<Text>Loading...</Text>}
      ref={navigationRef}
    >
      <ApiService.QueryClientProvider>
        {/* <ThemeProvider
          primaryColor={restaurant?.primaryColor}
          accentColor={restaurant?.accentColor}
        > */}
        <RootModule />
        {/* <RootStack loading={loading} token={token} /> */}
        {/* </ThemeProvider> */}
      </ApiService.QueryClientProvider>
    </NavigationContainer>
  );
};
