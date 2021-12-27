import React, { useContext } from 'react';
import { View, Text } from 'react-native';
import { Button } from 'react-native-paper';
import { AuthContext } from '../../context';

export function AuthorizationCodePage() {
  const authContext = useContext(AuthContext);
  return (
    <View>
      <Text>AuthorizationCode page</Text>
      <Button
        mode="contained"
        onPress={() => {
          // authContext.setStep(3);
        }}
      >
        Confirmar
      </Button>
    </View>
  );
}
