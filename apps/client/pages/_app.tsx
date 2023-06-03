import React from 'react';
import '../styles.css';
import { AppProps } from 'next/app';
import Head from 'next/head';
import { AuthContextProvider } from '../src/modules/Auth/context';
import { RootContextProvider } from '../src/modules/Root/context';
import { Providers } from '../providers';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Providers>
      <RootContextProvider>
        <AuthContextProvider>
          <Head>
            <title>MyTable</title>
            <link
              rel='shortcut icon'
              href='/img/icon-512x512.png'
            />
            <link
              rel='apple-touch-icon'
              href='/img/icon-512x512.png'
            />
            <link
              rel='manifest'
              href='/manifest.json'
            />
            <meta
              name='theme-color'
              content='#128a8a'
            />
          </Head>
          <Component {...pageProps} />
        </AuthContextProvider>
      </RootContextProvider>
    </Providers>
  );
}
