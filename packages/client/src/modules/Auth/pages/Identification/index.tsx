import { useRouting } from 'expo-next-react-navigation';
import React, { useContext, useEffect } from 'react';
import { ScrollView } from 'react-native';
import { Button, TextInput } from 'react-native-paper';
import { SizedBox } from '../../../../components/SizedBox';
import { AuthContext } from '../../context';

export function IdentificationPage() {
  const authContext = useContext(AuthContext);
  const router = useRouting();

  const [name, setName] = React.useState('');
  const [phone, setPhone] = React.useState('');
  const [email, setEmail] = React.useState('');

  return (
    <ScrollView
      contentContainerStyle={{
        flexGrow: 1,
      }}
    >
      <SizedBox h={32} />
      <TextInput
        label="Nome"
        style={{ alignSelf: 'stretch' }}
        value={name}
        onChangeText={(text) => setName(text)}
      />
      <SizedBox h={44} />
      <TextInput
        label="Telefone"
        style={{ alignSelf: 'stretch' }}
        value={phone}
        onChangeText={(text) => setPhone(text)}
      />
      <SizedBox h={44} />
      <TextInput
        label="Email"
        style={{ alignSelf: 'stretch' }}
        value={email}
        onChangeText={(text) => setEmail(text)}
      />
      <SizedBox h={44} />
      <Button
        mode="contained"
        onPress={() => {
          router.navigate({
            routeName: 'auth/identification/done',
          });
        }}
      >
        Avançar
      </Button>
      <SizedBox h={32} />
    </ScrollView>
  );
}
