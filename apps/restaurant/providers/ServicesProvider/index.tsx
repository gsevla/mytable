import React, { useEffect, useState } from 'react';
import { ApiService } from '#/services/api';
import LoadingScreen from '~/pages/Loading';

export function ServicesProvider({
  children,
}: {
  children: JSX.Element | null;
}) {
  const [isServicesLoaded, setIsServicesLoaded] = useState(false);

  async function loadServices() {
    try {
      await ApiService.getInstance().loadService();
      setIsServicesLoaded(true);
    } catch (error) {
      console.log('error on load services', error);
    }
  }

  useEffect(() => {
    loadServices();
  }, []);

  return !isServicesLoaded ? <LoadingScreen /> : children;
}
