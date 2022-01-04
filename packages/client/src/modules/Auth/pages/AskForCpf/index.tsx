import { useRouter } from 'next/router';
import React, { useContext } from 'react';
import { View, Text, Image } from 'react-native';
import { Button, TextInput } from 'react-native-paper';
import { AuthContext } from '../../context';

export function AskForCpfPage() {
  // const authContext = useContext(AuthContext);

  const router = useRouter();

  const [text, setText] = React.useState('');

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
    >
      <TextInput
        label="CPF"
        value={text}
        onChangeText={(text) => setText(text)}
      />
      <Button
        mode="contained"
        onPress={() => {
          // authContext.setStep(1);
          router.push('/auth/identification');
        }}
      >
        Avançar
      </Button>
    </View>
  );
}
