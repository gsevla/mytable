import { useRouter } from 'next/router';
import React, { useContext } from 'react';
import { View, Text } from 'react-native';
import { Button } from 'react-native-paper';
import { AuthContext } from '../../context';

export function IdentificationDonePage() {
  // const authContext = useContext(AuthContext);

  const router = useRouter();

  // useEffect(() => {
  //   router.replace('/auth', '/auth/forgot-password', { shallow: true });
  // }, []);

  return (
    <View>
      <Text>IdentificationDone page</Text>
      <Button
        mode="text"
        onPress={() => {
          // router.replace('/auth', '/auth/forgot-password');
          router.push('/auth/forgot-password');
          // authContext.setStep(3);
        }}
      >
        Não possuo mais acesso
      </Button>
      <Button
        mode="contained"
        onPress={() => {
          // authContext.setStep(4);
          router.push('/auth/code');
        }}
      >
        Avançar
      </Button>
    </View>
  );
}
