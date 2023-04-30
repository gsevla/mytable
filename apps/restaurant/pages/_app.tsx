import React, { useEffect, useState } from 'react';
import { AppProps } from 'next/app';
import { EmployeeWithoutPassword } from '@mytable/domain';
import { useRouter } from 'next/router';
import { Providers } from '#/providers/index';
import { useStorageService } from '#/hooks/storage';
import { STORAGE_KEYS } from '#/services/storage/keys';
import { EventsService } from '#/services/events';
import { useThemeDispatch } from '#/hooks/theme/useThemeDispatch';
import { useRestaurant } from '#/hooks/api/restaurant/useRestaurant';
import { useApiService } from '#/hooks/api/useApiService';

function PostProviders() {
  const router = useRouter();
  const apiService = useApiService();
  const storageService = useStorageService();
  const themeDispatch = useThemeDispatch();

  const { data: restaurant } = useRestaurant();

  const [authorized, setAuthorized] = useState(false);

  const getAccessToken = () =>
    storageService.getData(STORAGE_KEYS.ACCESS_TOKEN);

  const getEmployee = () =>
    storageService.getData<EmployeeWithoutPassword>(STORAGE_KEYS.EMPLOYEE);

  async function loadEventService() {
    const employee = await getEmployee();
    EventsService.getInstance().loadService(employee?.username ?? 'restaurant');
  }

  const redirectToAuth = async () => {
    router.push({ pathname: '/auth', query: { returnUrl: router.asPath } });
  };

  const replaceForReservationOrder = async () => {
    router.replace('/app/reservation-order');
  };

  const handleAccessTokenPresence = async () => {
    const accessToken = await getAccessToken();

    if (!accessToken) {
      redirectToAuth();
    } else {
      replaceForReservationOrder();
      apiService.httpClient.setHeader('Authorization', `Bearer ${accessToken}`);
      setAuthorized(true);
    }
  };

  useEffect(() => {
    handleAccessTokenPresence();
  }, []);

  useEffect(() => {
    if (authorized) {
      loadEventService();
    }
  }, [authorized]);

  useEffect(() => {
    if (restaurant) {
      themeDispatch({
        type: 'setPrimaryColor',
        payload: {
          primaryColor: restaurant.primaryColor,
        },
      });
      themeDispatch({
        type: 'setAccentColor',
        payload: {
          accentColor: restaurant.accentColor,
        },
      });
    }
  }, [restaurant]);

  return null;
}

const MemoizedPostProviders = React.memo(PostProviders, () => true); // never rerender

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Providers>
      <MemoizedPostProviders />
      <Component {...pageProps} />
    </Providers>
  );
}
