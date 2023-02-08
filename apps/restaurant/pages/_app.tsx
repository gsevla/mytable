import React from 'react';
import { AppProps } from 'next/app';
// import { AppContextProvider } from '~/modules/App/context';
import { Providers } from '../providers';
// import ApiService from '../services/api';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Providers>
      <Component {...pageProps} />
    </Providers>
  );
}
