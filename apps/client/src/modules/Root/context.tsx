import { ClientDto } from '@mytable/dtos';
import React, { useCallback, useEffect, useState } from 'react';
import { createContext } from 'use-context-selector';
import { ApiService, StorageService } from '../../services';
import { ThemeProvider } from '../Theme';
import { useFocusEffect } from 'expo-next-react-navigation';
import { Snackbar } from 'react-native-paper';
import { Platform } from 'react-native';
import router from 'next/router';

interface IRootContextProvider {
  children: React.ReactNode;
}

interface IRootContextValues {
  loading: boolean;
  loaded: boolean;
  client: ClientDto.IClient | null;
  setClient(client: ClientDto.IClient): void;
  token: string | null;
  setToken(token: string): void;
  showSnackBar(message: string): void;
}

export const RootContext = createContext({} as IRootContextValues);

function RootContextProvider({ children }: IRootContextProvider) {
  const [loading, setLoading] = useState(true);
  const [loaded, setLoaded] = useState(false);
  const [client, setClient] = useState<ClientDto.IClient | null>(null);
  const [clientLoaded, setClientLoaded] = useState(false);
  const [token, setToken] = useState<string | null>(null);
  const [tokenLoaded, setTokenLoaded] = useState(false);
  const [isSnackBarDefined, setIsSnackBarDefined] = useState(false);
  const [isSnackBarVisible, setIsSnackBarVisible] = useState(false);
  const [snackBarMessage, setSnackBarMessage] = useState('');

  const { data: restaurantData, isLoading: isRestaurantLoading } =
    ApiService.resources.restaurant.restaurantQueries.useQueryRestaurant();

  // lazy load effect to avoid next js warn about useLayout
  useFocusEffect(
    useCallback(() => {
      setIsSnackBarDefined(true);
    }, []),
  );

  function onSnackBarDismiss() {
    setIsSnackBarVisible(false);
    setSnackBarMessage('');
  }

  function showSnackBar(message: string) {
    setSnackBarMessage(message);
    setIsSnackBarVisible(true);
  }

  async function loadToken() {
    const _token = await StorageService.getData({ key: 'token' });
    if (_token) {
      setToken(_token);
    }
    setTokenLoaded(true);
  }

  async function loadClient() {
    const _client = await StorageService.getData({ key: 'client' });
    if (_client) {
      const parsedClient = JSON.parse(_client) as ClientDto.IClient;
      setClient(parsedClient);
    }
    setClientLoaded(true);
  }

  useEffect(() => {
    loadToken();
    loadClient();
  }, []);

  // navigate for correct path on web
  // WIP: do it at config level by redirect if possible
  useEffect(() => {
    if (Platform.OS === 'web') {
      if (tokenLoaded && clientLoaded) {
        if (token) {
          router.replace('app');
        } else {
          if (!client) {
            router.replace('auth');
          } else {
            router.replace('auth/identification/done');
          }
        }
      }
    }
  }, [token, tokenLoaded, client, clientLoaded]);

  useEffect(() => {
    if (!isRestaurantLoading) {
      setLoading(false);
      setLoaded(true);
    }
  }, [isRestaurantLoading]);

  return (
    <RootContext.Provider
      value={{
        loading,
        loaded,
        token,
        client,
        setClient,
        setToken,
        showSnackBar,
      }}
    >
      <ThemeProvider
        primaryColor={restaurantData?.primaryColor}
        accentColor={restaurantData?.accentColor}
      >
        {children}
        {isSnackBarDefined && (
          <Snackbar
            visible={isSnackBarVisible}
            onDismiss={onSnackBarDismiss}
            duration={4000}
            action={{ label: 'Fechar', onPress: onSnackBarDismiss }}
          >
            {snackBarMessage}
          </Snackbar>
        )}
      </ThemeProvider>
    </RootContext.Provider>
  );
}

export { RootContextProvider };
