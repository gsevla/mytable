import React, { useContext, useEffect } from 'react';
import { View, Text } from 'react-native';
import { Button } from 'react-native-paper';
import { AuthContext } from '../../context';
// import { useRouter } from 'next/router';

export function ForgotPasswordPage() {
  // const authContext = useContext(AuthContext);

  // const router = useRouter();

  // useEffect(() => {
  //   router.replace('/auth', '/auth/forgot-password', { shallow: true });
  // }, []);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#eeeeee',
        paddingHorizontal: 24,
        justifyContent: 'space-between',
      }}
    >
      <Text>ForgotPassword page</Text>
      <Button
        mode="text"
        onPress={() => {
          // authContext.setStep(3);
        }}
      >
        Fale conosco
      </Button>
    </View>
  );
}
