import { ClientDto } from '@mytable/dtos';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { createContext } from 'use-context-selector';
import { ApiService, StorageService } from '../../services';
import { ThemeProvider } from '../Theme';
import { useFocusEffect, useRouting } from 'expo-next-react-navigation';
import { Snackbar } from 'react-native-paper';
import { Platform } from 'react-native';

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
  const isMounted = useRef(false); // to avoid actions on prepare
  const router = useRouting();
  const [loading, setLoading] = useState(true);
  const [loaded, setLoaded] = useState(false);
  const [client, setClient] = useState<ClientDto.IClient | null>(null);
  const [token, setToken] = useState<string | null>(null);
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
  }

  async function loadClient() {
    const _client = await StorageService.getData({ key: 'client' });
    if (_client) {
      const parsedClient = JSON.parse(_client) as ClientDto.IClient;
      setClient(parsedClient);
    }
  }

  useEffect(() => {
    loadToken();
    loadClient();
  }, []);

  // navigate for correct path on web
  // WIP: do it at config level by redirect
  useEffect(() => {
    if (!isMounted.current) {
      isMounted.current = true;
    } else {
      if (Platform.OS === 'web') {
        if (token) {
          router.replace({
            routeName: 'app',
            web: {
              path: 'app',
            },
          });
        } else {
          if (!client) {
            router.replace({
              routeName: 'auth',
              web: {
                path: 'auth',
              },
            });
          } else {
            router.replace({
              routeName: 'identification-done',
              web: {
                path: 'auth/identification/done',
              },
            });
          }
        }
      }
    }
  }, [token, client]);

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
