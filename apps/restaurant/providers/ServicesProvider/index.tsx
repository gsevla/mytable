import React, { useEffect, useState } from 'react';
import { ApiService } from '#/services/api';
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
      setIsServicesLoaded(true);
    } catch (error) {
      console.log('error on load services', error);
    }
  }

  useEffect(() => {
    loadServices();
  }, []);

  return isServicesLoaded === false ? <LoadingScreen /> : children;
}
