// import { useRouter } from 'next/router';
import { useRouting } from 'expo-next-react-navigation';
import React from 'react';
import { View, Text } from 'react-native';
import { Button } from 'react-native-paper';

export function IdentificationDonePage() {
  const router = useRouting();

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#eeeeee',
        paddingHorizontal: 24,
        justifyContent: 'space-between',
      }}
    >
      <Text>IdentificationDone page</Text>
      <Button
        mode="text"
        onPress={() => {
          router.navigate({
            routeName: 'auth/forgot-password',
          });
        }}
      >
        Não possuo mais acesso
      </Button>
      <Button
        mode="contained"
        onPress={() => {
          router.navigate({
            routeName: 'auth/code',
          });
        }}
      >
        Avançar
      </Button>
    </View>
  );
}
