import { ClientDto } from '@mytable/dtos';
import { IClient } from '@mytable/dtos/client';
import React, { useEffect, useState } from 'react';
import { StatusBar } from 'react-native';
import { Snackbar } from 'react-native-paper';
import { createContext } from 'use-context-selector';
import { ApiService, StorageService } from '../../services';
import { ThemeProvider } from '../Theme';

interface IRootContextProvider {
  children: React.ReactNode;
}

interface IRootContextValues {
  loading: boolean;
  loaded: boolean;
  client: IClient | null;
  setClient(client: ClientDto.IClient): void;
  token: string | null;
  setToken(token: string): void;
  showSnackBar(message: string): void;
}

export const RootContext = createContext({} as IRootContextValues);

function RootContextProvider({ children }: IRootContextProvider) {
  const [loading, setLoading] = useState(true);
  const [loaded, setLoaded] = useState(false);
  const [client, setClient] = useState<IClient | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isSnackBarVisible, setIsSnackBarVisible] = useState(false);
  const [snackBarMessage, setSnackBarMessage] = useState('');

  useEffect(() => {
    if (loading) {
      StatusBar.setHidden(true);
    }

    if (loaded) {
      StatusBar.setHidden(false);
    }
  }, [loading, loaded]);

  function onSnackBarDismiss() {
    setIsSnackBarVisible(false);
    setSnackBarMessage('');
  }

  function showSnackBar(message: string) {
    setSnackBarMessage(message);
    setIsSnackBarVisible(true);
  }

  const { data: restaurantData, isLoading: isRestaurantLoading } =
    ApiService.resources.restaurant.restaurantQueries.useQueryRestaurant();

  async function loadToken() {
    const _token = await StorageService.getData({ key: 'token' });
    if (_token) {
      setToken(_token);
    }
  }

  async function loadClient() {
    const _client = await StorageService.getData({ key: 'client' });
    if (_client) {
      const _parsedClient = JSON.parse(_client) as ClientDto.IClient;
      setClient(_parsedClient);
    }
  }

  async function loadAll() {
    await Promise.all([loadToken(), loadClient()]);
  }

  useEffect(() => {
    loadAll();
  }, []);

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
        <Snackbar
          visible={isSnackBarVisible}
          onDismiss={onSnackBarDismiss}
          duration={4000}
          action={{ label: 'Fechar', onPress: onSnackBarDismiss }}
        >
          {snackBarMessage}
        </Snackbar>
      </ThemeProvider>
    </RootContext.Provider>
  );
}

export { RootContextProvider };
