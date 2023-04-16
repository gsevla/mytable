import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import LoadingScreen from '~/pages/Loading';
import { useStorageService } from '#/hooks/storage';
import { STORAGE_KEYS } from '#/services/storage/keys';

export default function App() {
  const router = useRouter();
  const storageService = useStorageService();

  const getAccessToken = () =>
    storageService.getData(STORAGE_KEYS.ACCESS_TOKEN);

  const redirectToAuth = async () => {
    router.push({ pathname: '/auth', query: { returnUrl: router.asPath } });
  };

  const replaceForDashboard = async () => {
    router.replace('/app/dashboard');
  };

  const handleAccessTokenPresence = async () => {
    const accessToken = await getAccessToken();

    if (!accessToken) {
      redirectToAuth();
    } else {
      replaceForDashboard();
    }
  };

  useEffect(() => {
    handleAccessTokenPresence();
  }, []);

  return <LoadingScreen />;
}
