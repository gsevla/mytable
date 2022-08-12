import React from 'react';
import { AppProps } from 'next/app';
import { AppContextProvider } from '~/modules/App/context';
import ApiService from '../services/api';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ApiService.QueryClientProvider>
      <Component {...pageProps} />
    </ApiService.QueryClientProvider>
  );
}
