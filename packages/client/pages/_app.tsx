import { AppProps } from 'next/app';
import { AuthContextProvider } from '../src/modules/Auth/context';
import { ThemeProvider } from '../src/modules/Theme';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider>
      <AuthContextProvider>
        <Component {...pageProps} />
      </AuthContextProvider>
    </ThemeProvider>
  );
}
