import React from 'react';
import { AppProps } from 'next/app';
import { Providers } from '#/providers/index';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Providers>
      <Component {...pageProps} />
    </Providers>
  );
}
