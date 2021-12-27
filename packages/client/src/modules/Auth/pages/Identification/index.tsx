import React, { useContext } from 'react';
import { View, Text } from 'react-native';
import { Button } from 'react-native-paper';
import { AuthContext } from '../../context';

export function IdentificationPage() {
  const authContext = useContext(AuthContext);
  return (
    <View>
      <Text>Identification page</Text>
      <Button
        mode="contained"
        onPress={() => {
          authContext.setStep(2);
        }}
      >
        Avançar
      </Button>
    </View>
  );
}
