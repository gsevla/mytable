import React, { useEffect, useState } from 'react';
import { AppProps } from 'next/app';
import { EmployeeWithoutPassword } from '@mytable/domain';
import { useRouter } from 'next/router';
import { Providers } from '#/providers/index';
import { useStorageService } from '#/hooks/storage';
import { STORAGE_KEYS } from '#/services/storage/keys';
import { EventsService } from '#/services/events';

function PostProviders() {
  const [authenticated, setAuthenticated] = useState(false);

  const router = useRouter();
  const storageService = useStorageService();

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
      setAuthenticated(true);
    }
  };

  useEffect(() => {
    handleAccessTokenPresence();
  }, []);

  useEffect(() => {
    if (authenticated) {
      loadEventService();
    }
  }, [authenticated]);

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
