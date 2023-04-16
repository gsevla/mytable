import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { STORAGE_KEYS } from '#/services/storage/keys';
import { useStorageService } from '#/hooks/storage';
import LoadingScreen from '~/pages/Loading';
import { useApiService } from '#/hooks/api/useApiService';

export function AuthGuardProvider({ children }) {
  const router = useRouter();
  const storageService = useStorageService();
  const apiService = useApiService();

  const [authorized, setAuthorized] = useState(false);

  const hideContent = () => setAuthorized(false);

  async function authCheck(url: string) {
    const accessToken = await storageService.getData<string>(
      STORAGE_KEYS.ACCESS_TOKEN
    );
    console.log('accessToken', accessToken);
    // redirect to login page if accessing a private page and not logged in
    const publicPaths = ['/', '/auth'];
    const path = url.split('?')[0];
    if (!accessToken && !publicPaths.includes(path)) {
      setAuthorized(false);
      router.push({
        pathname: '/auth',
        query: { returnUrl: router.asPath },
      });
    } else {
      apiService.httpClient.setHeader('Authorization', `Bearer ${accessToken}`);
      setAuthorized(true);
    }
  }

  function listenRouteChanges() {
    // on route change start - hide page content by setting authorized to false
    router.events.on('routeChangeStart', hideContent);
    // on route change complete - run auth check
    router.events.on('routeChangeComplete', authCheck);
  }

  // unsubscribe from events in useEffect return function
  function stopToListenRouteChanges() {
    router.events.off('routeChangeStart', hideContent);
    router.events.off('routeChangeComplete', authCheck);
  }

  useEffect(() => {
    authCheck(router.asPath);

    listenRouteChanges();

    return () => {
      stopToListenRouteChanges();
    };
  }, []);

  // if (!authorized) return <LoadingScreen />;

  return children;
}
