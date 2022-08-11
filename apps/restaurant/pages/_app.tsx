import { AppPageWrapper } from 'components/AppPageWrapper';
import { AppProps } from 'next/app';
import { AppContextProvider } from '~/modules/App/context';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Component {...pageProps} />
  )
}
