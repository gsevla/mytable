import { useRouter } from 'next/router';
import React, { useContext } from 'react';
import { View, Text } from 'react-native';
import { Button, TextInput } from 'react-native-paper';
import { AuthContext } from '../../context';

export function IdentificationPage() {
  // const authContext = useContext(AuthContext);

  const router = useRouter();

  const [name, setName] = React.useState('');
  const [phone, setPhone] = React.useState('');
  const [email, setEmail] = React.useState('');

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
    >
      <View
        style={{
          flex: 1,
          justifyContent: 'space-around',
          paddingVertical: 48,
        }}
      >
        <TextInput
          label="Nome"
          value={name}
          onChangeText={(text) => setName(text)}
        />
        <TextInput
          label="Telefone"
          value={phone}
          onChangeText={(text) => setPhone(text)}
        />
        <TextInput
          label="Email"
          value={email}
          onChangeText={(text) => setEmail(text)}
        />
      </View>
      <Button
        mode="contained"
        onPress={() => {
          // authContext.setStep(2);
          router.push('/auth/identification/done');
        }}
      >
        Avançar
      </Button>
    </View>
  );
}
