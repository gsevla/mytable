import React, { useContext } from 'react';
import { View, Text } from 'react-native';
import { Button } from 'react-native-paper';
import { AuthContext } from '../../context';

export function AskForCpfPage() {
  const authContext = useContext(AuthContext);
  return (
    <View>
      <Text>AskForCpf page</Text>
      <Button
        mode="contained"
        onPress={() => {
          authContext.setStep(1);
        }}
      >
        Avançar
      </Button>
    </View>
  );
}
