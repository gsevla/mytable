import { useRouting } from 'expo-next-react-navigation';
import React, { useContext, useEffect } from 'react';
import { ScrollView, View } from 'react-native';
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
    <View
      style={{
        flex: 1,
        backgroundColor: '#eeeeee',
        justifyContent: 'space-between',
        paddingHorizontal: 24,
      }}
    >
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          // backgroundColor: '#eeeeee',
          // paddingHorizontal: 24,
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
      </ScrollView>
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
      {/* <SizedBox h={32} /> */}
    </View>
  );
}
