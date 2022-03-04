import React, { useEffect, useMemo, useState } from 'react';
import { createContext } from 'use-context-selector';
import { ApiService } from '../../services';
import { ThemeProvider } from '../Theme';

interface IRootContextProvider {
  children: React.ReactNode;
}

interface IRootContextValues {
  loading: boolean;
  loaded: boolean;
  token: string | null;
  setToken(token: string): void;
}

export const RootContext = createContext({} as IRootContextValues);

function RootContextProvider({ children }: IRootContextProvider) {
  const [loading, setLoading] = useState(true);
  const [loaded, setLoaded] = useState(false);
  const [token, setToken] = useState<string | null>(null);

  const { data: restaurantData, isLoading: isRestaurantLoading } =
    ApiService.queries.useRestaurant();

  // const {
  //   data: clientData,
  //   isLoading: isClientLoading,
  //   error: clientError,
  // } = ApiService.queries.useClient();

  useEffect(() => {
    if (!isRestaurantLoading) {
      setLoading(false);
      setLoaded(true);
    }
  }, [isRestaurantLoading]);

  return (
    <RootContext.Provider value={{ loading, loaded, token, setToken }}>
      <ThemeProvider
        primaryColor={restaurantData?.primaryColor}
        accentColor={restaurantData?.accentColor}
      >
        {children}
      </ThemeProvider>
    </RootContext.Provider>
  );
}

export { RootContextProvider };
