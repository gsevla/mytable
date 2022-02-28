import { AppProps } from 'next/app';
import { useEffect, useState } from 'react';
import { AuthContextProvider } from '../src/modules/Auth/context';
import { ThemeProvider } from '../src/modules/Theme';
import { ApiService, StorageService } from '../src/services';

export default function App({ Component, pageProps }: AppProps) {
  const [restaurant, setRestaurant] = useState();

  useEffect(() => {
    ApiService.resources.restaurant
      .getRestaurant()
      .then((response) => {
        if (response.data) {
          setRestaurant(response.data);
          StorageService.setData({
            key: StorageService.keys.restaurant,
            value: JSON.stringify(response.data),
          }).catch((error) => {
            console.log('error on get restaurant from storage');
          });
        }
      })
      .catch((error) => {
        console.log('error on getRestaurant', error);
      })
      .finally(() => {
        // setLoading(false);
      });
  }, []);
  return (
    <ThemeProvider
      primaryColor={restaurant?.primaryColor}
      accentColor={restaurant?.accentColor}
    >
      <AuthContextProvider>
        <Component {...pageProps} />
      </AuthContextProvider>
    </ThemeProvider>
  );
}
