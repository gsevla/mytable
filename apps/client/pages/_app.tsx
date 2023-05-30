import React from 'react';
import '../styles.css';
import { AppProps } from 'next/app';
import { AuthContextProvider } from '../src/modules/Auth/context';
import { RootContextProvider } from '../src/modules/Root/context';
import { Providers } from '../providers';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Providers>
      <RootContextProvider>
        <AuthContextProvider>
          <Component {...pageProps} />
        </AuthContextProvider>
      </RootContextProvider>
    </Providers>
  );
}
