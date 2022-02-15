import React, { useEffect, useState } from 'react';
import { ScrollView, View } from 'react-native';
import { Button, TextInput } from 'react-native-paper';
import { useContextSelector } from 'use-context-selector';
import { SizedBox } from '../../../../components/SizedBox';
import { AuthContext } from '../../context';
import { Headline, Subheading } from 'react-native-paper';

export function AuthorizationCodePage() {
  const handleSetActiveStep = useContextSelector(
    AuthContext,
    (values) => values.handleSetActiveStep,
  );
  useEffect(() => {
    handleSetActiveStep('AuthorizationCodePage');
  }, []);

  const [code, setCode] = useState('');
  return (
    <ScrollView
      contentContainerStyle={{
        flexGrow: 1,
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 24,
        backgroundColor: '#eeeeee',
      }}
    >
      <Headline>Código enviado!</Headline>
      <SizedBox h={16} />
      <Subheading>
        Após o recebimento do código, o insira no campo abaixo
      </Subheading>
      <SizedBox h={32} />
      <TextInput
        label="Código"
        placeholder="Digite o código"
        style={{ alignSelf: 'stretch' }}
        value={code}
        onChangeText={(text) => setCode(text)}
      />
      <View>
        <SizedBox h={32} />
        <Button mode="text" onPress={() => {}}>
          Reenviar código
        </Button>
        <SizedBox h={24} />
        <Button mode="contained" onPress={() => {}}>
          Confirmar
        </Button>
      </View>
    </ScrollView>
  );
}
