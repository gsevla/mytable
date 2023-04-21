import { Client } from '@mytable/domain';
import React, { useCallback, useEffect, useState } from 'react';
import { createContext } from 'use-context-selector';
import { useFocusEffect } from 'expo-next-react-navigation';
import { Snackbar } from 'react-native-paper';
import { Platform } from 'react-native';
import router from 'next/router';
import { ThemeProvider } from '../Theme';
import { useStorageService } from '#hooks/storage';
import { STORAGE_KEYS } from '~/services/storage/keys';
import { useRestaurant } from '#hooks/api/restaurant/useRestaurant';

interface IRootContextProvider {
  children: React.ReactNode;
}

interface IRootContextValues {
  loading: boolean;
  loaded: boolean;
  client: Client | null;
  setClient(client: Client): void;
  token: string | null;
  setToken(token: string): void;
  showSnackBar(message: string): void;
}

export const RootContext = createContext({} as IRootContextValues);

function RootContextProvider({ children }: IRootContextProvider) {
  const storageService = useStorageService();

  const [loading, setLoading] = useState(true);
  const [loaded, setLoaded] = useState(false);
  const [client, setClient] = useState<Client | null>(null);
  const [clientLoaded, setClientLoaded] = useState(false);
  const [token, setToken] = useState<string | null>(null);
  const [tokenLoaded, setTokenLoaded] = useState(false);
  const [isSnackBarDefined, setIsSnackBarDefined] = useState(false);
  const [isSnackBarVisible, setIsSnackBarVisible] = useState(false);
  const [snackBarMessage, setSnackBarMessage] = useState('');

  const { data: restaurantData, isLoading: isRestaurantLoading } =
    useRestaurant();

  // lazy load effect to avoid next js warn about useLayout
  useFocusEffect(
    useCallback(() => {
      setIsSnackBarDefined(true);
    }, [])
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
    const innerToken = await storageService.getData<string>(STORAGE_KEYS.token);
    if (innerToken) {
      setToken(innerToken);
    }
    setTokenLoaded(true);
  }

  async function loadClient() {
    const innerClient = await storageService.getData<Client>(
      STORAGE_KEYS.client
    );
    if (innerClient) {
      setClient(innerClient);
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
        } else if (!client) {
          router.replace('auth');
        } else {
          router.replace('auth/identification/done');
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
