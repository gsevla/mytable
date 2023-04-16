import React, { useEffect, useState } from 'react';
import { ApiService } from '#/services/api';
import { StorageService } from '#/services/storage';
import LoadingScreen from '~/pages/Loading';

export function ServicesProvider({
  children,
}: {
  children: JSX.Element | null;
}) {
  const [isServicesLoaded, setIsServicesLoaded] = useState(false);

  function loadServices() {
    try {
      ApiService.getInstance().loadService();
      StorageService.getInstance().loadService();
      setIsServicesLoaded(true);
      console.log('services loaded!');
    } catch (error) {
      console.log('error on load services', error);
    }
  }

  useEffect(() => {
    loadServices();
  }, []);

  return isServicesLoaded === false ? <LoadingScreen /> : children;
}
