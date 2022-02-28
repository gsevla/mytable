import { useFocusEffect, useRouting } from 'expo-next-react-navigation';
import React, { useCallback, useEffect } from 'react';
import { ScrollView, View } from 'react-native';
import { Button, TextInput } from 'react-native-paper';
import { useContextSelector } from 'use-context-selector';
import { SizedBox } from '../../../../components/SizedBox';
import { AuthContext } from '../../context';
import { mask } from 'remask';

export function IdentificationPage() {
  const router = useRouting();

  const handleSetActiveStep = useContextSelector(
    AuthContext,
    (values) => values.handleSetActiveStep,
  );

  const setUser = useContextSelector(AuthContext, (values) => values.setUser);
  const userState = useContextSelector(
    AuthContext,
    (values) => values.userState,
  );

  // useEffect(() => {
  //   handleSetActiveStep('IdentificationPage');
  // }, []);

  useFocusEffect(
    useCallback(() => {
      handleSetActiveStep('IdentificationPage');
    }, [handleSetActiveStep]),
  );

  const [name, setName] = React.useState(userState.personalData.name);
  const [phone, setPhone] = React.useState(
    mask(userState.personalData.phone, ['(99) 99999-9999']),
  );
  const [email, setEmail] = React.useState(userState.personalData.email);

  return (
    <ScrollView
      contentContainerStyle={{
        flexGrow: 1,
        backgroundColor: '#eeeeee',
        justifyContent: 'space-between',
        paddingHorizontal: 24,
      }}
    >
      <SizedBox h={0} />
      <View>
        <TextInput
          label="Nome"
          style={{ alignSelf: 'stretch' }}
          value={name}
          onChangeText={(text) => setName(text)}
          placeholder="Digite seu nome"
        />
        <SizedBox h={44} />
        <TextInput
          label="Telefone"
          style={{ alignSelf: 'stretch' }}
          value={mask(phone, ['(99) 99999-9999'])}
          onChangeText={(text) => setPhone(text)}
          placeholder="Digite seu telefone"
        />
        <SizedBox h={44} />
        <TextInput
          label="Email"
          style={{ alignSelf: 'stretch' }}
          value={email}
          onChangeText={(text) => setEmail(text)}
          placeholder="Digite seu email"
        />
      </View>
      <View>
        <SizedBox h={32} />
        <Button
          mode="contained"
          onPress={() => {
            setUser({
              personalData: {
                name,
                phone,
                email,
              },
            });
            router.navigate({
              routeName: 'identification-done',
              web: {
                path: 'auth/identification/done',
              },
            });
          }}
        >
          Avançar
        </Button>
      </View>
    </ScrollView>
  );
}
