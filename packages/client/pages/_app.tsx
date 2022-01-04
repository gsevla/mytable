import { AppProps } from 'next/app';
import { parseCookies } from 'nookies';
import { AuthContextProvider } from '../src/modules/Auth/context';

export default function App({ Component, pageProps }: AppProps) {
  console.log('uuuuuu');
  return (
    <AuthContextProvider>
      <Component {...pageProps} />
    </AuthContextProvider>
  );
}

export async function getServerSideProps(context) {
  const cookies = parseCookies(context);
  console.log('kkoo', cookies);
  return {
    props: {
      auth: {
        selectedStepPage: cookies.AUTH_STEP,
      },
    },
  };
}
