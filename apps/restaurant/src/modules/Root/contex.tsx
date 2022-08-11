import React, { useEffect, useState } from 'react';
import { createContext } from 'use-context-selector';
import router from 'next/router';

interface IRootContextProvider {
  children: React.ReactNode;
}

interface IRootContextValues {
  loading: boolean;
}

export const RootContext = createContext({} as IRootContextValues);

export function RootContextProvider({children}: IRootContextProvider) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    router.replace('app/dashboard')
    setLoading(true);
  }, []);

  return (
    <RootContext.Provider value={{
      loading
    }}>
      {children}
    </RootContext.Provider>
  )
}
