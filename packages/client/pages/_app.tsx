import { AppProps } from 'next/app';
import { AuthContextProvider } from '../src/modules/Auth/context';
import { RootContextProvider } from '../src/modules/Root/context';
import { ApiService } from '../src/services';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ApiService.QueryClientProvider>
      <RootContextProvider>
        <AuthContextProvider>
          <Component {...pageProps} />
        </AuthContextProvider>
      </RootContextProvider>
    </ApiService.QueryClientProvider>
  );
}
