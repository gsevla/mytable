import React, { useContext } from 'react';
import { View, Text } from 'react-native';
import { Button } from 'react-native-paper';
import { AuthContext } from '../../context';

export function AskForCpfPage() {
  const a = useContext(AuthContext);
  console.log('aa', a);
  return (
    <View>
      <Text>AskForCpf page</Text>
      <Button
        onPress={() => {
          a.setStep(1);
        }}
      >
        Avançar
      </Button>
    </View>
  );
}
